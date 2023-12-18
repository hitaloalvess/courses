import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../interfaces/check-ins-interface'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class CheckInsRepository implements ICheckInsRepository {
  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: 20,
      take: (page - 1) * 20,
    })
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({
      data,
    })
  }

  async save(checkIn: CheckIn) {
    return await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    })
  }
}
