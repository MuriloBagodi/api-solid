import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'

export const authenticateRoutes = async (app: FastifyInstance) => {
  // Register a user
  app.post('/', authenticate)
}
