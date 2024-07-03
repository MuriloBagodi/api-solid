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
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
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
    expect(gymResponse.body).toEqual(
      expect.objectContaining({ title: 'academia legal' }),
    )
  })

  it('Should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia legal',
        description: 'academia legal',
        phone: '+55 11 97379-7436',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia legal 2',
        description: 'academia legal 2',
        phone: '+55 11 97379-7436',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      })

    const gymResponse = await request(app.server)
      .get('/gym/search')
      .query({ query: '2' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(gymResponse.statusCode).toEqual(200)
    expect(gymResponse.body.gyms).toHaveLength(1)
    expect(gymResponse.body.gyms).toEqual([
      expect.objectContaining({ title: 'academia legal 2' }),
    ])
  })

  it('Should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia legal',
        description: 'academia legal',
        phone: '+55 11 97379-7436',
        latitude: -27.0747279,
        longitude: -49.4889672,
      })

    await request(app.server)
      .post('/gym')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'academia legal 2',
        description: 'academia legal 2',
        phone: '+55 11 97379-7436',
        latitude: -22.679574069186508,
        longitude: -47.66593685292176,
      })

    const gymResponse = await request(app.server)
      .get('/gym/nearby')
      .query({ userLat: -27.0747279, userLon: -49.4889672 })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(gymResponse.statusCode).toEqual(200)
    expect(gymResponse.body.gyms).toHaveLength(1)
    expect(gymResponse.body.gyms).toEqual([
      expect.objectContaining({ title: 'academia legal' }),
    ])
  })
})
