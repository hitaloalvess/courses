import { Gym, Prisma } from '@prisma/client'

export interface IFetchNearByGymsParams {
  latitude: number
  longitude: number
}
export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: IFetchNearByGymsParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(gymParams: Prisma.GymCreateInput): Promise<Gym>
}
