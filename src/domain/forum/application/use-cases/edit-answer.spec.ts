import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('it should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toValue(),
      content: 'Conteúdo da pergunta atualizada',
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'Conteúdo da pergunta atualizada',
    })
  })

  it('it should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toValue(),
        content: 'Conteúdo da pergunta atualizada',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit a nonexistent answer', async () => {
    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: 'non-existent-id',
        content: 'Conteúdo da pergunta atualizada',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
