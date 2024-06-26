import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../checkinsRepository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepositorie implements CheckInsRepository {
  public items: CheckIn[] = []
  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = this.items.find((checkIn) => checkIn.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async cancelCheckIn(userId: string, checkId: string) {
    const index = this.items.findIndex(
      (item) => item.id === checkId && item.user_id === userId,
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    }

    return this.items.find(
      (item) => item.id === checkId && item.user_id === userId,
    )
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInSameDate) {
      return null
    }

    return checkInSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId)

    return checkIns.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)

    return checkIn
  }
}
