import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'

export class AnswerCreatedEvents implements DomainEvent {
  public ocurredAt: Date
  public asnwer: Answer

  constructor(answer: Answer) {
    this.asnwer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.asnwer.id
  }
}
