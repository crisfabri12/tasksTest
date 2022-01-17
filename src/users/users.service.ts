import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './Interfaces/User';
import { UserEntity } from './Interfaces/UserEntity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  createUser(newUser: User): Promise<User> {
    return this.users.save(newUser);
  }

  getUsers(): Promise<User[]> {
    return this.users.find();
  }

  getUser(email: string): Promise<User | undefined> {
    return this.users.findOne({ email });
  }

  getUserId(id: number): Promise<User | undefined> {
    return this.users.findOne({ id: id });
  }

  updateUser(id: number, task: User): Promise<UpdateResult> {
    return this.users.update(id, task);
  }

  deleteUser(id: number): Promise<DeleteResult> {
    return this.users.delete(id);
  }
}
