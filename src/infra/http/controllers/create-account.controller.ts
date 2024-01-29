import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { Public } from '@/infra/auth/decorators/public.decorator';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const createAccountValidationPipe = new ZodValidationPipe(
  createAccountBodySchema,
);

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(createAccountValidationPipe) body: CreateAccountBodySchema,
  ) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      );
    }

    const hashedPassword = await hash(password, 8);

    const accountCreated = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { account: accountCreated };
  }
}
