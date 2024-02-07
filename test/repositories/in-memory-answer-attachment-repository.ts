import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachment: AnswerAttachment[] = [];

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachment.filter(
      (item) => item.answerId.toString() === answerId,
    );

    return answerAttachments;
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.answerAttachment.push(...attachments);
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.answerAttachment.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });

    this.answerAttachment = answerAttachments;
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachment.filter(
      (item) => item.answerId.toString() !== answerId,
    );

    this.answerAttachment = answerAttachments;
  }
}
