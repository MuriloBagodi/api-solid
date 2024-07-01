import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('User (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to register', async () => {
    const res = await request(app.server).post('/user').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
    })

    expect(res.statusCode).toEqual(201)
  })
})
