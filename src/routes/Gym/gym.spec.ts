import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gymResponse = await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia legal',
        description: 'academia legal',
        phone: '+55 11 97379-7436',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      })

    expect(gymResponse.statusCode).toEqual(201)
    expect(gymResponse.body.gym.gym).toEqual(
      expect.objectContaining({ title: 'academia legal' }),
    )
  })
})
