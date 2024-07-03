import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role?: 'MEMBER' | 'ADMIN',
) {
  await request(app.server)
    .post('/user')
    .send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
      role: role === undefined ? 'MEMBER' : role,
    })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'teste@teste.com',
    password: '123456789',
  })
  const { token } = authResponse.body

  return { token }
}
