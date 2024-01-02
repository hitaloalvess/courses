import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async findById(questionId: string) {
    const question = this.questions.find(
      (item) => item.id.toString() === questionId,
    )

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const question = this.questions.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.questions.push(question)
  }

  async update(question: Question) {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions[questionIndex] = question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (item) => item.id === question.id,
    )

    this.questions.splice(questionIndex, 1)
  }
}
