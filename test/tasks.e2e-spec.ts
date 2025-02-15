import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  CreateTaskDto,
  TaskStatus,
} from 'src/modules/tasks/entities/tasks.entity';
import { CreateUserDto } from '@modules/user/entities/creat.entity.dto';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let taskId: string;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await prisma.task.deleteMany();

    const userDto: CreateUserDto = {
      username: 'Cicero Roberto',
      password: 'Hos32575@',
    };

    await request(app.getHttpServer()).post('/user').send(userDto).expect(201);

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'Cicero Roberto', password: 'Hos32575@' });

    token = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await prisma.task.deleteMany();
    await app.close();
  });

  it('/tasks (POST) - should create a new task', async () => {
    const taskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'This is a test task',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(taskDto)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.title).toBe(taskDto.title);
    expect(response.body.data.status).toBe(TaskStatus.PENDING);

    taskId = response.body.data.id;
  });

  it('/tasks (GET) - should return a list of tasks', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('/tasks/:id (GET) - should return a task by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', taskId);
  });

  it('/tasks/:id (PATCH) - should update a task', async () => {
    const updateDto = { title: 'Updated Task' };

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto)
      .expect(200);

    expect(response.body.title).toBe(updateDto.title);
  });

  it('/tasks/:id (DELETE) - should delete a task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});
