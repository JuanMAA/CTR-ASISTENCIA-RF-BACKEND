import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/modules/auth_user/auth_user.module';
import { DaysBlockedModule } from 'src/modules/days_blocked/days_blocked.module';
import { ScheduleModule } from 'src/modules/schedules/schedules.module';
import { ScheduleTurnsModule } from 'src/modules/schedule_turns/schedule_turns.module';
import { TurnsModule } from 'src/modules/turns/turns.module';
import { UsersTime } from 'src/modules/users_time/users_time.entity';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    UsuariosModule,
    DaysBlockedModule,
    ScheduleTurnsModule,
    ScheduleModule,
    TurnsModule,
    UsersTime,
  ],
  providers: [],
})
export class AppModule {}
