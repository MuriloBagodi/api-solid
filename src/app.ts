import fastify from 'fastify'
import { userRoutes } from './routes/User/user.routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(userRoutes, { prefix: 'user' })

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
