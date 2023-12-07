import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user'
import { authenticateController } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)

  app.post('/sessions', authenticateController)
}
