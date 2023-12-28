import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface AnswerQuestionUseCaseRequest{
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase{
  constructor(
    private readonly answerRepo: AnswerRepository,
  ){}
  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest){
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    });

    await this.answerRepo.create(answer)
    
    return answer
  }
}