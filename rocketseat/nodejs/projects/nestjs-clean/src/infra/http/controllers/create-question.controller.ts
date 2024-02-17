import { CurrentUser } from '@/infra/auth/decorators/current-use.decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserPayload } from '@/infra/auth/jwt-strategy';
import { ZodValidationPipe } from '@/infra/pipes/zod.validation.pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { z } from 'zod';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { QuestionPresenter } from '../presenters/question.presenter';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachmentIds: z.array(z.string().uuid()),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachmentIds } = body;

    const userId = user.sub;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentIds,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const question = result.value.question;

    return { question: QuestionPresenter.toHTTP(question) };
  }
}
