import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findByUserIdOnDate(userId: string, data: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  cancelCheckIn(
    userId: string,
    checkId: string,
  ): Promise<CheckIn | null | undefined>
  findById(checkInId: string): Promise<CheckIn | null>
}
