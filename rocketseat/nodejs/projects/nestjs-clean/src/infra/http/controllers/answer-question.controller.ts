import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { z } from 'zod';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { CurrentUser } from '@/infra/auth/decorators/current-use.decorator';
import { UserPayload } from '@/infra/auth/jwt-strategy';
import { ZodValidationPipe } from '@/infra/pipes/zod.validation.pipe';

const answerQuestionBodySchema = z.object({
  content: z.string(),
  attachmentsIds: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(answerQuestionBodySchema);

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachmentsIds } = body;
    const userId = user.sub;

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}