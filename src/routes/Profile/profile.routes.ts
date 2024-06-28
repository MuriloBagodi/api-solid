import { FastifyInstance } from 'fastify'
import { getProfile } from './profile.controller'
import { verifyJWT } from '@/middlewares/verify-jwt'
export const profileRoutes = async (app: FastifyInstance) => {
  // get all users
  app.get('/', { onRequest: verifyJWT }, getProfile)
}
