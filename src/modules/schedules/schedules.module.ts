import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { Schedules } from './schedules.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Schedules]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [SchedulesService],
  controllers: [SchedulesController],
  exports: [SchedulesService],
})
export class ScheduleModule {}
