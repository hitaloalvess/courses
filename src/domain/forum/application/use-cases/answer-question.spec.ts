import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}
test('it should be able to create a new answer question', async () => {
  const answerUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
