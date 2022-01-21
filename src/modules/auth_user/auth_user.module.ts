import { Global, Module } from '@nestjs/common';
import { UsuariosService } from './auth_user.service';
import { UsuariosController } from './auth_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './auth_user.entity';
import Config from '../../config/app';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthUser]),
    JwtModule.register({
      secret: Config.JwtModules.secretOrKey,
      signOptions: {
        expiresIn: Config.JwtModules.expiresIn,
      },
    }),
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
