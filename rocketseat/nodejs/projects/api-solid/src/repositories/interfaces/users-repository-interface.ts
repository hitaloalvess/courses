import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(user: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
