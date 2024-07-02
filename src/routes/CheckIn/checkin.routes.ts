import { FastifyInstance } from 'fastify'

import {
  createCheckIn,
  historyCheckIn,
  metricsCheckIn,
} from './checkin.controller'

import { verifyJWT } from '@/middlewares/verify-jwt'

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)
  // post
  app.post('/:gymId', createCheckIn)
  app.patch('/:checkInId/validate', createCheckIn)

  // get
  app.get('/history', historyCheckIn)
  app.get('/metrics', metricsCheckIn)
}
