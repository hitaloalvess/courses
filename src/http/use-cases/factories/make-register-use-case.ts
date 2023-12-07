import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUseCase } from '../register-user'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUseCase(usersRepository)

  return registerUserUseCase
}
