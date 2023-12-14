import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInsRepository {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
