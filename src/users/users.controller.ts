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
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './Interfaces/User';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private appService: AppService,
  ) {}

  @Post(':token')
  async CreateUser(
    @Body() newUser: User,
    @Param('token') token: string,
  ): Promise<User> {
    if (await this.appService.validate(token)) {
      return this.userService.createUser(newUser);
    }
  }

  @Get(':token')
  async getUsers(@Param('token') token: string): Promise<User[]> {
    if (await this.appService.validate(token)) {
      return this.userService.getUsers();
    }
  }

  @Get('/:email/:token')
  async getUser(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<User> {
    if (await this.appService.validate(token)) {
      return this.userService.getUser(email);
    }
  }

  @Put(':id/::token')
  async UpdateUser(
    @Body() user: User,
    @Param('id') UserId: string,
    @Param('token') token: string,
  ): Promise<UpdateResult> {
    if (await this.appService.validate(token)) {
      return this.userService.updateUser(parseInt(UserId), user);
    }
  }

  @Delete(':id/:token')
  async DeleteUser(
    @Param('id') id,
    @Param('token') token: string,
  ): Promise<DeleteResult> {
    if (await this.appService.validate(token)) {
      return this.userService.deleteUser(parseInt(id));
    }
  }
}
