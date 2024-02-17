import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = []

  async findById(questioncommentId: string): Promise<QuestionComment | null> {
    const questioncomment = this.questionComments.find(
      (item) => item.id.toString() === questioncommentId,
    )

    if (!questioncomment) return null

    return questioncomment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.questionComments
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)

    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.questionComments.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.questionComments.splice(questionCommentIndex, 1)
  }
}
