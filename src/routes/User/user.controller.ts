import { PrismaUsersRepositories } from '@/repositories/prisma-users-repositorie'
import { prisma } from '@/lib/prisma/prisma'
import { RegisterUseCase } from '@/services/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'

export async function getUsers(req: FastifyRequest, res: FastifyReply) {
  await prisma.user
    .findMany()
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch((err) => console.log(err))
}

export async function registerUser(req: FastifyRequest, res: FastifyReply) {
  const userSchema = z.object({
    name: string(),
    email: string().email(),
    password: string().min(8),
  })

  const { name, email, password } = userSchema.parse(req.body)

  try {
    const usersRepositories = new PrismaUsersRepositories()
    await usersRepositories.searchEmail(email)
    const registerUseCase = new RegisterUseCase(usersRepositories)
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    res.status(409).send()
  }

  res.status(201).send()
}
