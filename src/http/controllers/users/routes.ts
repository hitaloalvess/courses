import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { RegisterUserController } from './register'
import { AuthenticateController } from './authenticate'
import { ProfileController } from './profile'
import { RefreshTokenController } from './refresh-token'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
  app.post('/sessions', AuthenticateController)
  app.patch('/token/refresh', RefreshTokenController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
