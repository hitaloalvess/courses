import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { DomainEvents } from '@/core/events/domain-events';
import { AnswerCommentedEvent } from '@/domain/forum/enterprise/events/answer-commented-event';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';

export class OnAnswerCommented implements EventHandler {
  constructor(
    private answersRepo: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerCommentedNotification.bind(this),
      AnswerCommentedEvent.name,
    );
  }

  private async sendAnswerCommentedNotification({
    answerComment,
  }: AnswerCommentedEvent) {
    const answer = await this.answersRepo.findById(
      answerComment.answerId.toString(),
    );

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentário em "${answer.excerpt}"`,
        content: `${answerComment.content.substring(0, 40).concat('...')}`,
      });
    }
  }
}
