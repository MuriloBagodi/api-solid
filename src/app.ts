import fastify from 'fastify'
import { userRoutes } from './routes/User/user.routes'
import { ZodError } from 'zod'
import { env } from './env'
import { authenticateRoutes } from './routes/Authenticate/authenticate.routes'
import { profileRoutes } from './routes/Profile/profile.routes'
import fastifyJwt from '@fastify/jwt'
import { gymRoutes } from './routes/Gym/gym.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes, { prefix: 'user' })
app.register(authenticateRoutes, { prefix: 'sessions' })
app.register(gymRoutes, { prefix: 'gym' })

/** Authenticated */
app.register(profileRoutes, { prefix: 'me' })

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/New Relic/Sentry
  }
  return res.status(500).send({ message: 'Internal Server Error' })
})
