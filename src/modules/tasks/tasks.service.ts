import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from './entities/tasks.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  async getTasks(skip: number = 0, take: number = 10, status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: status ? { status } : {},
      skip,
      take,
    });
  }

  async getTaskById(id: number) {
    return this.prisma.task.findUnique({ where: { id: id.toString() } });
  }

  async updateTask(id: number, dto: Partial<CreateTaskDto>) {
    return this.prisma.task.update({ where: { id: id.toString() }, data: dto });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id: id.toString() } });
  }
}
