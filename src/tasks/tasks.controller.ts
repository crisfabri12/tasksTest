import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Task } from 'src/tasks/Interfaces/Tasks';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private appService: AppService,
  ) {}

  @Post(':token')
  async CreateTask(
    @Body() newTask: Task,
    @Param('token') token: string,
  ): Promise<Task> {
    if (await this.appService.validate(token)) {
      return this.tasksService.createTask(newTask);
    }
  }

  @Get(':token')
  async getTasks(@Param('token') token: string): Promise<Task[]> {
    if (await this.appService.validate(token)) {
      return this.tasksService.getTasks();
    }
  }

  @Get(':taskId/:token')
  async getTask(
    @Param('taskId') taskId: string,
    @Param('token') token: string,
  ): Promise<Task> {
    if (await this.appService.validate(token)) {
      return this.tasksService.getTask(parseInt(taskId));
    }
  }

  @Put(':id/:token')
  async UpdateTask(
    @Body() task: Task,
    @Param('id') taskId: string,
    @Param('token') token: string,
  ): Promise<UpdateResult> {
    if (await this.appService.validate(token)) {
      return this.tasksService.updateTask(parseInt(taskId), task);
    }
  }

  @Delete(':id/:token')
  async DeleteTask(
    @Param('id') id,
    @Param('token') token: string,
  ): Promise<DeleteResult> {
    if (await this.appService.validate(token)) {
      return this.tasksService.deleteTask(parseInt(id));
    }
  }
}
