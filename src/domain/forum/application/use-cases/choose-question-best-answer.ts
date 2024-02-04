import { Either, left, right } from '@/core/errors/handler/either';
import { Question } from '../../enterprise/entities/question';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { Injectable } from '@nestjs/common';

interface ChooseQuestionBestAnswerRequest {
  authorId: string;
  answerId: string;
}

type ChooseQuestionBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>;

@Injectable()
export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answerRepo: AnswersRepository,
    private readonly questionRepo: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answerRepo.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepo.findById(
      answer.questionId.toString(),
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepo.update(question);

    return right({ question });
  }
}
