import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchGymsUseCase } from '@/http/use-cases/factories/make-search-gyms-use-case'

export async function SearchGymController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query,
    page,
  })

  return reply.status(200).send({ gyms })
}
