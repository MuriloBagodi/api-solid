import { FastifyInstance } from 'fastify'
import { getProfile } from './profile.controller'
export const profileRoutes = async (app: FastifyInstance) => {
  // get all users
  app.get('/', getProfile)
}
