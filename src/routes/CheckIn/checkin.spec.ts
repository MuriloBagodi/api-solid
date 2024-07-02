import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma/prisma'

describe('Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Java script Gym',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      },
    })
    const response = await request(app.server)
      .post(`/checkin/${gym.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      })

    expect(response.statusCode).toEqual(201)
  })

  it('Should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Java script Gym',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })
    const response = await request(app.server)
      .get(`/checkin/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id,
      }),
    ])
  })

  it('Should be able to get the total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Java script Gym',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        { gym_id: gym.id, user_id: user.id },
        { gym_id: gym.id, user_id: user.id },
      ],
    })
    const response = await request(app.server)
      .get(`/checkin/metrics`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkInsCount).toEqual(2)
  })

  it('Should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Java script Gym',
        longitude: -46.59773109029157,
        latitude: -23.55484665154023,
      },
    })
    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })
    const response = await request(app.server)
      .patch(`/checkin/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
