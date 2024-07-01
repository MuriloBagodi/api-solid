import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to get the user profile', async () => {
    await request(app.server).post('/user').send({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '123456789',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'teste@teste.com',
      password: '123456789',
    })
    const { token } = authResponse.body
    const res = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.user).toEqual(
      expect.objectContaining({ email: 'teste@teste.com' }),
    )
  })
})
