import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { CreateCheckInsController } from './create'
import { FetchHistoryUserCheckInsController } from './history'
import { GetUserMetricsCheckInsController } from './metrics'
import { ValidateCheckInsController } from './validate'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', FetchHistoryUserCheckInsController)
  app.get('/check-ins/metrics', GetUserMetricsCheckInsController)

  app.post('/check-ins/:gymId', CreateCheckInsController)
  app.patch('/check-ins/:checkInId/validate', ValidateCheckInsController)
}
