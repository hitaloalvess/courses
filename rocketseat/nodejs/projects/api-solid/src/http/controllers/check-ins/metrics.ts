import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/http/use-cases/factories/make-get-user-metrics-use-case'

export async function GetUserMetricsCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
