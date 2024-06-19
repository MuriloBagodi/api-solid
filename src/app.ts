import fastify from 'fastify'
import { userRoutes } from './routes/User/user.routes'

export const app = fastify()

app.register(userRoutes, { prefix: 'user' })
