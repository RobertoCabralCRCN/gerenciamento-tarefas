import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Logger,
  HttpCode,
  HttpStatus,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, TaskStatus } from './entities/tasks.entity';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { APIException, APIResponse } from 'src/shared/api';
import { HttpExceptionFilter } from 'src/shared/filters';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseFilters(HttpExceptionFilter)
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<APIResponse<any>> {
    this.logger.log(`Creating task: ${JSON.stringify(createTaskDto)}`);
    const createdTask = await this.tasksService.createTask(createTaskDto);
    this.logger.log(
      `Task created successfully: ${JSON.stringify(createdTask)}`,
    );
    return new APIResponse<any>(0, 'Task created successfully', createdTask);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of tasks returned successfully.',
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('status') status?: TaskStatus,
  ): Promise<any[]> {
    return this.tasksService.getTasks(skip, take, status);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task found.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('id') id: number): Promise<any> {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
    return task;
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Task updated successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<any> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Task deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }
}
