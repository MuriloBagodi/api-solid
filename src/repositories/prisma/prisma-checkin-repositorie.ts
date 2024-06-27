import { prisma } from './../../lib/prisma/prisma'
import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../checkinsRepository'
import dayjs from 'dayjs'

export class PrismaCheckInRepositorie implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: { id: data.id },
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, data: Date) {
    const startOfTheDay = dayjs(data).startOf('date')
    const endOfTheDay = dayjs(data).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        created_at: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() },
      },
    })

    return checkIn
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({ where: { user_id: userId } })

    return count
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async cancelCheckIn(userId: string, checkId: string) {
    const checkIn = prisma.checkIn.delete({
      where: {
        id: checkId,
        user_id: userId,
      },
    })

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId },
    })

    return checkIn
  }
}
