import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

import { UsersTimeService } from './users_time.service';
import { UsersTimeController } from './users_time.controller';
import { UsersTime } from './users_time.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersTime]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [UsersTimeService],
  controllers: [UsersTimeController],
  exports: [UsersTime],
})
export class UsersTimeModule {}
