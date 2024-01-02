import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('it should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        slug: Slug.create('nova-pergunta'),
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'Title da pergunta atualizada',
      content: 'Conteúdo da pergunta atualizada',
    })

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'Title da pergunta atualizada',
      content: 'Conteúdo da pergunta atualizada',
    })
  })

  it('it should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        slug: Slug.create('nova-pergunta'),
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: newQuestion.id.toValue(),
        title: 'Title da pergunta atualizada',
        content: 'Conteúdo da pergunta atualizada',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit a nonexistent question', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: 'non-existent-id',
        title: 'Title da pergunta atualizada',
        content: 'Conteúdo da pergunta atualizada',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
