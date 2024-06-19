import { PrismaUsersRepositories } from '@/repositories/prisma-users-repositorie'
import { prisma } from '@/lib/prisma/prisma'
import { passwordHash } from '@/middleware/passwordHandler'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    throw new Error('Email already exist !')
  }

  const prismaUsersRepositories = new PrismaUsersRepositories()

  prismaUsersRepositories.create({
    name,
    email,
    password: await passwordHash(password),
  })
}
