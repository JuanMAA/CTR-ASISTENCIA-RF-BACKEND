import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly ScheduleService: SchedulesService) {}

  @Get()
  async getSchedules(): Promise<any> {
    return this.ScheduleService.getSchedules();
  }

  @Get(':id')
  async getSchedulesById(@Param('id') id): Promise<any> {
    return this.ScheduleService.getSchedulesById(id);
  }

  @Delete(':id')
  async deleteSchedulesById(@Param('id') id): Promise<any> {
    return this.ScheduleService.deleteSchedulesById(id);
  }

  @Post()
  async createSchedule(@Body() app: any): Promise<any> {
    return await this.ScheduleService.createSchedule(app);
  }

  @Put()
  async updateSchedule(@Body() app: any): Promise<any> {
    return await this.ScheduleService.updateSchedule(app);
  }
}
