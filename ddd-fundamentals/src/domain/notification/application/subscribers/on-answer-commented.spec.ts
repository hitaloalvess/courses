import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { OnAnswerCommented } from './on-answer-commented'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('OnAnswerCommented', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCommented(inMemoryAnswersRepository, sendNotificationUseCase)
  })

  it('should send a notification when topic has new commented answer', async () => {
    const answer = makeAnswer()
    const answerCommet = makeAnswerComment({
      answerId: answer.id,
    })

    inMemoryAnswersRepository.create(answer)

    inMemoryAnswerCommentsRepository.create(answerCommet)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
