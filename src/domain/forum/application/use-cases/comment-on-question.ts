import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepo: QuestionsRepository,
    private readonly questionCommentsRepo: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest) {
    const questionExists = await this.questionsRepo.findById(questionId)

    if (!questionExists) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.questionCommentsRepo.create(questionComment)

    return {
      questionComment,
    }
  }
}
