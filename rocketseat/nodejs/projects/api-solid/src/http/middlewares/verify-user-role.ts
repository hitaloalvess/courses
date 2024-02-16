import { Role } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(verifyUserRole: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== verifyUserRole) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
