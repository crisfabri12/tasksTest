import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './Interfaces/TaskEntity';

import { Task } from './Interfaces/Tasks';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasks: Repository<TaskEntity>,
  ) {}

  createTask(newTask: Task): Promise<Task> {
    return this.tasks.save(newTask);
  }

  getTasks(): Promise<Task[]> {
    return this.tasks.find();
  }

  getTask(id): Promise<Task> {
    return this.tasks.findOne(id);
  }

  updateTask(id: number, task: Task): Promise<UpdateResult> {
    return this.tasks.update(id, task);
  }

  deleteTask(id: number): Promise<DeleteResult> {
    return this.tasks.delete(id);
  }
}
