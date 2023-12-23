import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCheckInUseCase } from '@/http/use-cases/factories/make-check-in-use-case'

export async function CreateCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInsParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInsBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()

  const { checkIn } = await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send(checkIn)
}
