import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.answers.find((item) => item.id.toString() === answerId)

    if (!answer) return null

    return answer
  }

  async create(answer: Answer) {
    this.answers.push(answer)
  }

  async update(answer: Answer) {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)

    this.answers[answerIndex] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)

    this.answers.splice(answerIndex, 1)
  }
}
