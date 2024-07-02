import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { createGym, nearByGym, searchGym } from './gym.controller'
export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  // post gym
  app.post('/', createGym)

  // get gym
  app.get('/search', searchGym)
  app.get('/nearby', nearByGym)
}
