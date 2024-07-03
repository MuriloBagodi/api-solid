import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case'
import { makeFetchNearbyGymUseCase } from '@/services/factories/make-fetch-nearby-gym-use-case'
import { makeSearchGymsUseCase } from '@/services/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(req: FastifyRequest, res: FastifyReply) {
  const gymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } = gymSchema.parse(
    req.body,
  )

  try {
    const createGymUseCase = makeCreateGymUseCase()
    const { gym } = await createGymUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return res.status(201).send(gym)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

export async function searchGym(req: FastifyRequest, res: FastifyReply) {
  const searchGymsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsSchema.parse(req.query)

  const searchGymUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymUseCase.execute({ query, page })
  return res.status(200).send({ gyms })
}

export async function nearByGym(req: FastifyRequest, res: FastifyReply) {
  const nearBySchema = z.object({
    userLat: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLon: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLat, userLon } = nearBySchema.parse(req.query)

  const fetchNearByGymsUseCase = makeFetchNearbyGymUseCase()
  const { gyms } = await fetchNearByGymsUseCase.execute({ userLat, userLon })
  return res.status(200).send({ gyms })
}
