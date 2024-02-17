import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public questionAttachment: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachment.filter(
      (item) => item.questionId.toString() === questionId,
    );

    return questionAttachments;
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionAttachment.push(...attachments);
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.questionAttachment.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });

    this.questionAttachment = questionAttachments;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachment.filter(
      (item) => item.questionId.toString() !== questionId,
    );

    this.questionAttachment = questionAttachments;
  }
}
