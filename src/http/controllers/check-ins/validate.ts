import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeValidateCheckInUseCase } from '@/http/use-cases/factories/make-validate-check-in-use-case'

export async function ValidateCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInsParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = createCheckInsParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  const { checkIn } = await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(200).send(checkIn)
}
