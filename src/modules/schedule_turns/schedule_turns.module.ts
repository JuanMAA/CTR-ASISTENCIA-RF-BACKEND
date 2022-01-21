import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

import { ScheduleTurnsService } from './schedule_turns.service';
import { ScheduleTurnsController } from './schedule_turns.controller';
import { ScheduleTurns } from './schedule_turns.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleTurns]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [ScheduleTurnsService],
  controllers: [ScheduleTurnsController],
  exports: [ScheduleTurnsService],
})
export class ScheduleTurnsModule {}
