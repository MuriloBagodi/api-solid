import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma/prisma'
import { UsersRepository } from '../usersRepository'

export class PrismaUsersRepositories implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    return user
  }
}
