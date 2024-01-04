import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async findById(answercommentId: string): Promise<AnswerComment | null> {
    const answercomment = this.answerComments.find(
      (item) => item.id.toString() === answercommentId,
    )

    if (!answercomment) return null

    return answercomment
  }

  async create(answerComment: AnswerComment) {
    this.answerComments.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const answerCommentIndex = this.answerComments.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.answerComments.splice(answerCommentIndex, 1)
  }
}
