import { ICheckInsRepository } from '@/repositories/interfaces/check-ins-interface'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidateError } from './errors/late-check-in-validate-error'

interface IValidateCheckInUseCaseRequest {
  checkInId: string
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidateError()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}
