import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Profile (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to get the user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const res = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body.user).toEqual(
      expect.objectContaining({ email: 'teste@teste.com' }),
    )
  })
})
