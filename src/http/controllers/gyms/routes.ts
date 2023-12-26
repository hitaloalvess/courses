import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { CreateGymController } from './create'
import { SearchGymController } from './search'
import { FetchNearByGymsController } from './fetch-nearby'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', SearchGymController)
  app.get('/gyms/nearby', FetchNearByGymsController)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    CreateGymController,
  )
}
