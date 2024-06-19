import { FastifyInstance } from 'fastify'
import { getUsers, registerUser } from './user.controller'

export const userRoutes = async (app: FastifyInstance) => {
  // get all users
  app.get('/', getUsers)

  // Register a user
  app.post('/', registerUser)
}
