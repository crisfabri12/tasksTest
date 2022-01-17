import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './JWTPayload';
import { User } from './users/Interfaces/User';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUser(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async generateJwt({ email }: User): Promise<any> {
    const user: JWTPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  async validate(token): Promise<any> {
    const data = await this.jwtService.verifyAsync(token);
    if (!data) {
      return new UnauthorizedException();
    }
    const user = await this.usersService.getUserId(data.id);
    if (!user) {
      return new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
