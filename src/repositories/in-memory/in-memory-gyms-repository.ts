import { Gym } from '@prisma/client'
import { IGymsRepository } from '../interfaces/gyms-repository-interface'

export class InMemoryGymsRepository implements IGymsRepository {
  public checkIns: Gym[] = []

  async findById(id: string) {
    const gym = this.checkIns.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
