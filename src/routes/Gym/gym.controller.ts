import { makeCreateGymUseCase } from '@/services/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(req: FastifyRequest, res: FastifyReply) {
  const gymSchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
  })

  const { title, description, phone, latitude, longitude } = gymSchema.parse(
    req.body,
  )

  const data = {
    title,
    description,
    phone,
    latitude,
    longitude,
  }

  try {
    const createGymUseCase = makeCreateGymUseCase()
    const gym = await createGymUseCase.execute(data)
    return res.status(201).send({ gym })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}
