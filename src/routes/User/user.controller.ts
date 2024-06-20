import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositorie'
import { prisma } from '@/lib/prisma/prisma'
import { RegisterUseCase } from '@/services/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'
import { UserAlreadyExistsError } from '@/services/errors_handlers/user-already-exists-error'

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
    await usersRepositories.findByEmail(email)
    const registerUseCase = new RegisterUseCase(usersRepositories)

    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    return res.status(500).send() // TODO: Fix me!!
  }

  res.status(201).send()
}
