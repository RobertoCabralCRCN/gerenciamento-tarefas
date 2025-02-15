import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../../../src/modules/tasks/tasks.service';
import { TaskStatus } from '../../../src/modules/tasks/entities/tasks.entity';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a task', async () => {
    const task = {
      id: '1',
      title: 'Test',
      description: 'Description',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };

    jest.spyOn(prisma.task, 'create').mockResolvedValue(task);

    expect(await service.createTask(task)).toEqual(task);
    expect(prisma.task.create).toHaveBeenCalledWith({ data: task });
  });

  it('should return a list of tasks', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.PENDING,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Task 2',
        description: 'Desc 2',
        status: TaskStatus.DONE,
        createdAt: new Date(),
      },
    ];

    jest.spyOn(prisma.task, 'findMany').mockResolvedValue(tasks);

    expect(await service.getTasks()).toEqual(tasks);
    const task = {
      id: '1',
      title: 'Task 1',
      description: 'Desc 1',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };

    jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(task);

    expect(await service.getTaskById(1)).toEqual(task);
    expect(prisma.task.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should update a task', async () => {
    const updatedTask = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Description',
      status: TaskStatus.IN_PROGRESS,
      createdAt: new Date(),
    };

    jest.spyOn(prisma.task, 'update').mockResolvedValue(updatedTask);

    expect(await service.updateTask(1, updatedTask)).toEqual(updatedTask);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedTask,
    });
  });

  it('should delete a task', async () => {
    const deletedTask = {
      id: '1',
      title: 'Deleted Task',
      description: 'Deleted Description',
      status: TaskStatus.DONE,
      createdAt: new Date(),
    };

    jest.spyOn(prisma.task, 'delete').mockResolvedValue(deletedTask);

    expect(await service.deleteTask(1)).toEqual(deletedTask);
    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
