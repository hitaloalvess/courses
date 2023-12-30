import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('it should be able to create a new answer question', async () => {
    const answer = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswerRepository.answers[0].id).toEqual(answer.id)
  })
})
