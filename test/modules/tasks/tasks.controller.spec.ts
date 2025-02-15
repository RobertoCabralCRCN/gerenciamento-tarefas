import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../../../src/modules/tasks/tasks.controller';
import { TasksService } from '../../../src/modules/tasks/tasks.service';
import {
  CreateTaskDto,
  TaskStatus,
} from '../../../src/modules/tasks/entities/tasks.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            createTask: jest.fn(),
            getTasks: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Task description',
      status: TaskStatus.PENDING,
      id: '',
      createdAt: undefined,
    };
    const createdTask = { id: '1', ...createTaskDto, createdAt: new Date() };

    jest.spyOn(service, 'createTask').mockResolvedValue(createdTask);

    const result = await controller.create(createTaskDto);

    expect(result.data).toEqual(createdTask);
    expect(service.createTask).toHaveBeenCalledWith(createTaskDto);
  });

  it('should return a list of tasks', async () => {
    const tasks = [
      {
        id: '1',
        title: 'Task',
        description: 'Desc',
        status: TaskStatus.PENDING,
        createdAt: new Date(),
      },
    ];
    jest.spyOn(service, 'getTasks').mockResolvedValue(tasks);

    const result = await controller.findAll(0, 10, undefined);

    expect(result).toEqual(tasks);
    expect(service.getTasks).toHaveBeenCalledWith(0, 10, undefined);
  });

  it('should return a task by id', async () => {
    const task = {
      id: '1',
      title: 'Task',
      description: 'Desc',
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    jest.spyOn(service, 'getTaskById').mockResolvedValue(task);

    const result = await controller.findOne(1);

    expect(result).toEqual(task);
    expect(service.getTaskById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if task does not exist', async () => {
    jest.spyOn(service, 'getTaskById').mockResolvedValue(null);

    await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should update a task', async () => {
    const updatedTask = {
      id: '1',
      title: 'Updated Task',
      description: 'Updated Desc',
      status: TaskStatus.DONE,
      createdAt: new Date(),
    };
    jest.spyOn(service, 'updateTask').mockResolvedValue(updatedTask);

    const result = await controller.update(1, { title: 'Updated Task' });

    expect(result).toEqual(updatedTask);
    expect(service.updateTask).toHaveBeenCalledWith(1, {
      title: 'Updated Task',
    });
  });

  it('should delete a task', async () => {
    jest.spyOn(service, 'deleteTask').mockResolvedValue(undefined);

    await expect(controller.remove(1)).resolves.toBeUndefined();
    expect(service.deleteTask).toHaveBeenCalledWith(1);
  });
});
