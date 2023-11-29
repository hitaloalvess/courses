import { hash } from 'bcryptjs'

interface IRegisterUseCase {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: IRegisterUseCase) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists!')
    }

    await this.usersRepository({ name, email, password_hash })
  }
}
