import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { createGym, nearByGym, searchGym } from './gym.controller'
import { verifyUserRole } from '@/middlewares/verify-user-role'
export const gymRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  // post gym
  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createGym)

  // get gym
  app.get('/search', searchGym)
  app.get('/nearby', nearByGym)
}
