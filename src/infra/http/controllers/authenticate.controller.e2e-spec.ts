import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { StudentFactory } from 'test/factories/make-student';

describe('Create account (e2e)', () => {
  let app: INestApplication;
  let studentFactory: StudentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    studentFactory = moduleRef.get(StudentFactory);

    await app.init();
  });

  test('[POST] /sessions', async () => {
    await studentFactory.makePrismaStudent({
      email: 'johndoe@email.com',
      password: await hash('1234567', 8),
    });

    const authResponse = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'johndoe@email.com',
        password: '1234567',
      });

    console.log(authResponse.error);

    expect(authResponse.statusCode).toBe(201);
    expect(authResponse.body).toEqual({
      token: expect.any(String),
    });
  });
});
