import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchNearbyGymsUseCase } from '@/http/use-cases/factories/make-fetch-nearby-gyms-use-case'

export async function FetchNearByGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchNearbyQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude } = fetchNearbyQuerySchema.parse(request.query)

  const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchNearbyGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({ gyms })
}
