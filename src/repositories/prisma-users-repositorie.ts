import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma/prisma'

export class PrismaUsersRepositories {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async searchEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      console.log(user)
      throw new Error('Email already exist !')
    }
  }
}
