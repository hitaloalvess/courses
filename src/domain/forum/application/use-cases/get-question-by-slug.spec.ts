import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('it should be able to create a new question', async () => {
    const newQuestion = Question.create({
      title: 'Nova pergunta',
      content: 'Conteúdo da nova pergunta',
      slug: Slug.create('nova-pergunta'),
      authorId: new UniqueEntityID(),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'nova-pergunta' })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Nova pergunta')
  })
})
