import { Public } from '@/infra/auth/decorators/public.decorator';
import { ZodValidationPipe } from '@/infra/pipes/zod.validation.pipe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { z } from 'zod';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const authenticateValidationPipe = new ZodValidationPipe(
  authenticateBodySchema,
);

type authenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller('/sessions')
@Public()
export class AuthenticateController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  async handle(@Body(authenticateValidationPipe) body: authenticateBodySchema) {
    const { email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithSameEmail) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const isPasswordValid = await compare(password, userWithSameEmail.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match');
    }

    const token = this.jwt.sign({ sub: userWithSameEmail.id });

    return {
      token,
    };
  }
}
