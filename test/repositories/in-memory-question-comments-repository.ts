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

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const questionCommentIndex = this.questionComments.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.questionComments.splice(questionCommentIndex, 1)
  }
}
