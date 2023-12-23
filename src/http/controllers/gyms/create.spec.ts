import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { generateAuthenticateToken } from '@/http/utils/tests/generate-authenticate-token'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // Esperar que o app já tenha terminado de inicializar (ready é um evento disparado pelo app quando isso acontece)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {
    const { token } = await generateAuthenticateToken(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'MACAR',
        description: 'Academia macar fitness',
        phone: '17998899929',
        latitude: -20.1818112,
        longitude: -49.709056,
      })

    expect(response.statusCode).toEqual(201)
  })
})
