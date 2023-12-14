import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInsRepository } from '../interfaces/check-ins-interface'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
