import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

import { DaysBlockedService } from './days_blocked.service';
import { DayBlockedsController } from './days_blocked.controller';
import { DaysBlocked } from './days_blocked.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([DaysBlocked]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [DaysBlockedService],
  controllers: [DayBlockedsController],
  exports: [DaysBlockedService],
})
export class DaysBlockedModule { }
