import { makeCheckInUseCase } from '@/services/factories/make-checkin-use-case'
import { makeFetchUserCheckInsUseCase } from '@/services/factories/make-fetch-user-checkins-numbers-use-case'
import { makeGetUserMetricsUseCase } from '@/services/factories/make-get-user-metrics-use-case'
import { makeValidateCheckInUseCase } from '@/services/factories/make-validate-checkin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckIn(req: FastifyRequest, res: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const checkInSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = checkInSchema.parse(req.body)
  const { gymId } = checkInParamsSchema.parse(req.params)

  const createCheckInUseCase = makeCheckInUseCase()
  const checkIn = await createCheckInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLat: latitude,
    userLon: longitude,
  })
  res.code(201).send({ checkIn })
}

export async function historyCheckIn(req: FastifyRequest, res: FastifyReply) {
  const historyCheckInsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCheckInsSchema.parse(req.query)

  const searchGymUseCase = makeFetchUserCheckInsUseCase()
  const { checkIns } = await searchGymUseCase.execute({
    userId: req.user.sub,
    page,
  })
  return res.status(200).send({ checkIns })
}

export async function metricsCheckIn(req: FastifyRequest, res: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  })
  return res.status(200).send({ checkInsCount })
}

export async function validateCheckIn(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInSchema.parse(req.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  const checkIn = await validateCheckInUseCase.execute({
    checkInId,
  })
  res.code(204).send({ checkIn })
}
