import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { DomainEvents } from '@/core/events/domain-events';
import { QuestionCommentedEvent } from '@/domain/forum/enterprise/events/question-commented-event';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

export class OnQuestionCommented implements EventHandler {
  constructor(
    private questionsRepo: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionCommentedNotification.bind(this),
      QuestionCommentedEvent.name,
    );
  }

  private async sendQuestionCommentedNotification({
    questionComment,
  }: QuestionCommentedEvent) {
    const question = await this.questionsRepo.findById(
      questionComment.questionId.toString(),
    );

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 20)
          .concat('...')}"`,
        content: `${questionComment.content.substring(0, 40).concat('...')}`,
      });
    }
  }
}
