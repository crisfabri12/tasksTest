import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './Interfaces/UserEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppModule } from 'src/app.module';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, AppService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
