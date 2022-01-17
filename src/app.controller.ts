import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { User } from './users/Interfaces/User';

@Controller()
export class AppController {
  constructor(private appService: AppService, private jwtService: JwtService) {}

  @Get(':token')
  async getHello(@Param('token') token: string): Promise<any> {
    return this.appService.validate(token);
  }

  @Post('auth/login')
  async login(@Body() Postuser: User) {
    const user = this.appService.validateUser(
      Postuser.email,
      Postuser.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({ id: (await user).id });

    return {
      message: 'success',
      token: jwt,
    };
  }
}
