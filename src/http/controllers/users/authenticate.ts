import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '../../use-cases/factories/make-authenticate-use-case'

export async function AuthenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/', // Rotas do backend que terão acesso ao cookie
        secure: true, // Define que o cookie será encriptado através do HTTP's, com isso o frontend não irá conseguir ler os dados do cookie com uma informação limpa(com valor primitivo)
        sameSite: true, // Cookie só conseguirá ser acessado dentro do mesmo domínio
        httpOnly: true, // Garante que o cookie só será acessível dentro do backend
      })
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}
