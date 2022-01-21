import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

import { TurnsService } from './turns.service';
import { TurnsController } from './turns.controller';
import { Turns } from './turns.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Turns]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [TurnsService],
  controllers: [TurnsController],
  exports: [TurnsService],
})
export class TurnsModule {}
