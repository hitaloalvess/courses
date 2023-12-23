import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { generateAuthenticateToken } from '@/http/utils/tests/generate-authenticate-token'

describe('Fetch nearby gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready() // Esperar que o app já tenha terminado de inicializar (ready é um evento disparado pelo app quando isso acontece)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby gym', async () => {
    // Todo: Criar funcao para geracao automatica de token
    const { token } = await generateAuthenticateToken(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'MACAR',
        description: 'Academia macar fitness',
        phone: '17998899929',
        latitude: -20.1818112,
        longitude: -49.709056,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'MILFE',
        description: 'Academia milfe fitness',
        phone: '17998899929',
        latitude: -20.3028024,
        longitude: -49.7448473,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.1818112,
        longitude: -49.709056,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms[0]).toEqual(
      expect.objectContaining({
        title: 'MACAR',
      }),
    )
  })
})
