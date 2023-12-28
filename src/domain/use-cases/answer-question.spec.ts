import { test, expect } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('Create answer question', () => {

  const answer = new AnswerQuestionUseCase().execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta'
  })

  expect(answer.content).toEqual('Nova resposta')
})