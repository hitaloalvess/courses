import { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gymParams: Prisma.GymCreateInput): Promise<Gym>
}
