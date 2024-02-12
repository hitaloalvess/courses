import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification';
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { makeQuestion } from 'test/factories/make-question';
import { MockInstance } from 'vitest';
import { waitFor } from 'test/utils/wait-for';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachment-repository';
import { OnQuestionCommented } from './on-question-commented';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository';
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students.repository';

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>;

describe('OnQuestionCommented', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository();
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    );

    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    );

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    );

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

    new OnQuestionCommented(
      inMemoryQuestionsRepository,
      sendNotificationUseCase,
    );
  });

  it('should send a notification when topic has new commented question', async () => {
    const question = makeQuestion();
    const questionCommet = makeQuestionComment({
      questionId: question.id,
    });

    inMemoryQuestionsRepository.create(question);

    inMemoryQuestionCommentsRepository.create(questionCommet);

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled();
    });
  });
});
