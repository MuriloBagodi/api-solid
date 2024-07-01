import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to authenticate', async () => {
    await request(app.server).post('/user').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'teste@teste.com',
      password: '123456789',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
