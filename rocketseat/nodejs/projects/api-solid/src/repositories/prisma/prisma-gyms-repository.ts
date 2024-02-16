import { Gym, Prisma } from '@prisma/client'
import {
  IFetchNearByGymsParams,
  IGymsRepository,
} from '../interfaces/gyms-repository-interface'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: { id },
    })
  }

  async findManyNearby({ latitude, longitude }: IFetchNearByGymsParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchMany(query: string, page: number) {
    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async create(gymParams: Prisma.GymCreateInput) {
    return await prisma.gym.create({
      data: gymParams,
    })
  }
}
