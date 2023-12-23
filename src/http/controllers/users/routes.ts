import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { RegisterUserController } from './register'
import { AuthenticateController } from './authenticate'
import { ProfileController } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)

  app.post('/sessions', AuthenticateController)

  app.get('/me', { onRequest: [verifyJWT] }, ProfileController)
}
