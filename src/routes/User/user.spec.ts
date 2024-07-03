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

  it('Should be able to get users', async () => {
    await request(app.server).post('/user').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
    })

    await request(app.server).post('/user').send({
      name: 'Teste 2',
      email: 'teste2@teste.com',
      password: '123456789',
    })

    const response = await request(app.server).get('/user').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.users).toHaveLength(2)
  })

  it('Should be able to refresh token', async () => {
    await request(app.server).post('/user').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'teste@teste.com',
      password: '123456789',
    })

    const cookies = authResponse.get('Set-Cookie') ?? ([] as string[])

    const response = await request(app.server)
      .patch('/user/token/refresh')
      .set('Cookie', cookies)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
