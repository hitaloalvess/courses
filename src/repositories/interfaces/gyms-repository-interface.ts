import { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(gymParams: Prisma.GymCreateInput): Promise<Gym>
}
