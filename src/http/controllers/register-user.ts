import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '../use-cases/register-user'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    //
    const usersRepository = new PrismaUsersRepository()
    const registerUserUseCase = new RegisterUseCase(usersRepository)

    await registerUserUseCase.execute({ name, email, password })
  } catch {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
