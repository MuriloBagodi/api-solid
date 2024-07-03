import { FastifyInstance } from 'fastify'
import { getUsers, registerUser } from './user.controller'
import { refresh } from '@/middlewares/refresh'

export const userRoutes = async (app: FastifyInstance) => {
  // get all users
  app.get('/', getUsers)

  // Register a user
  app.post('/', registerUser)
  app.patch('/token/refresh', refresh)
}
