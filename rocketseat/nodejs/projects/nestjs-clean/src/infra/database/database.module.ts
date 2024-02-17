import { Module } from '@nestjs/common';

import {
  QuestionsRepository,
  QuestionCommentsRepository,
  QuestionAttachmentsRepository,
  AnswersRepository,
  AnswerCommentsRepository,
  AnswerAttachmentsRepository,
} from '@/domain/forum/application/repositories/';
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository';
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository';
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository';
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository';
import { PrismaService } from './prisma/prisma.service';
import { StudentsRepository } from '@/domain/forum/application/repositories/students.repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students.repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments.repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository';
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';
import { CacheModule } from '../cache/cach.module';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    { provide: QuestionsRepository, useClass: PrismaQuestionsRepository },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    { provide: AnswersRepository, useClass: PrismaAnswersRepository },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    StudentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
