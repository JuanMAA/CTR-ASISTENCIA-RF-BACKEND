import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Config from '../config/app';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(Config.database as TypeOrmModuleOptions)],
  providers: [],
  exports: [],
})
export class GlobalModule {}
