import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { createGym } from './gym.controller'
export const gymRoutes = async (app: FastifyInstance) => {
  // post gym
  app.post('/', { onRequest: verifyJWT }, createGym)
}
