import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepo: AnswersRepository,
    private readonly answerCommentsRepo: AnswerCommentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest) {
    const answerExists = await this.answersRepo.findById(answerId)

    if (!answerExists) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      content,
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
    })

    await this.answerCommentsRepo.create(answerComment)

    return {
      answerComment,
    }
  }
}
