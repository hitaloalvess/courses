import { IUsersRepository } from '@/repositories/interfaces/users-repository-interface'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface IRegisterUserUseCase {
  name: string
  email: string
  password: string
  role?: Role
}

interface IRegisterUserUseCaseResponse {
  user: User
}
export class RegisterUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: IRegisterUserUseCase): Promise<IRegisterUserUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    })

    return {
      user,
    }
  }
}
