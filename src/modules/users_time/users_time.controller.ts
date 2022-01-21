import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersTimeService } from './users_time.service';

@Controller('users_time')
export class UsersTimeController {
  constructor(private readonly UserTimeService: UsersTimeService) {}

  @Get()
  async getUsersTime(): Promise<any> {
    return this.UserTimeService.getUsersTime();
  }

  @Get(':id')
  async getUsersTimeById(@Param('id') id): Promise<any> {
    return this.UserTimeService.getUsersTimeById(id);
  }

  @Delete(':id')
  async deleteUsersTimeById(@Param('id') id): Promise<any> {
    return this.UserTimeService.deleteUsersTimeById(id);
  }

  @Post()
  async createUserTime(@Body() app: any): Promise<any> {
    return await this.UserTimeService.createUserTime(app);
  }

  @Put()
  async updateUserTime(@Body() app: any): Promise<any> {
    return await this.UserTimeService.updateUserTime(app);
  }
}
