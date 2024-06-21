import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositorie'
import { FastifyReply, FastifyRequest } from 'fastify'
import { string, z } from 'zod'
import { AuthenticateUseCase } from '@/services/authenticate'
import { InvalidCredentialError } from '@/services/errors_handlers/invalid-credential-error'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: string().email(),
    password: string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const usersRepositories = new PrismaUsersRepositories()
    await usersRepositories.findByEmail(email)
    const authenticateUseCase = new AuthenticateUseCase(usersRepositories)

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }

  res.status(200).send()
}
