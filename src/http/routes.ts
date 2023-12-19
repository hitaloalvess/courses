import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user'
import { authenticateController } from './controllers/authenticate'
import { verifyJWT } from './middlewares/verify-jwt'
import { profileController } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)

  app.post('/sessions', authenticateController)

  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
