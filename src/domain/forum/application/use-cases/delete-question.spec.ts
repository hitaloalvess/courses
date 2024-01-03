import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('it should be able to delete a question', async () => {
    const question = makeQuestion(
      {
        slug: Slug.create('nova-pergunta'),
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({ authorId: 'author-1', questionId: 'question-1' })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })

  it('it should not be able to delete a question from another user', async () => {
    const question = makeQuestion(
      {
        slug: Slug.create('nova-pergunta'),
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await expect(() =>
      sut.execute({ authorId: 'author-2', questionId: 'question-1' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
