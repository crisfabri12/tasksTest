import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { jwtConstants } from 'src/constants';
import { UsersModule } from 'src/users/users.module';
import { TaskEntity } from './Interfaces/TaskEntity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, AppService],
})
export class TasksModule {}
