import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchUserCheckInsHistoryUseCase } from '@/http/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function FetchHistoryUserCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchHistoryUserCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchHistoryUserCheckInsQuerySchema.parse(request.query)

  const fetchHistoryUserCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchHistoryUserCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send(checkIns)
}
