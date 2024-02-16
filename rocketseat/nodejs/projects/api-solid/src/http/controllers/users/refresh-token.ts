import { FastifyRequest, FastifyReply } from 'fastify'

export async function RefreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true }) // Verifica se existe um cookie valido na requsição, caso existe o código abaixo será executado

  const { role, sub } = request.user
  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub,
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
}
