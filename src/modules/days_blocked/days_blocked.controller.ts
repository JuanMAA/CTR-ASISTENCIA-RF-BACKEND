import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DaysBlockedService } from './days_blocked.service';

@Controller('days_blocked')
export class DayBlockedsController {
  constructor(private readonly daysBlockedService: DaysBlockedService) {}

  @Get()
  async getDayBlockeds(): Promise<any> {
    return this.daysBlockedService.getDaysBlocked();
  }

  @Get(':id')
  async getDayBlockedsById(@Param('id') id): Promise<any> {
    return this.daysBlockedService.getDaysBlockedById(id);
  }

  @Delete(':id')
  async deleteDayBlockedsById(@Param('id') id): Promise<any> {
    return this.daysBlockedService.deleteDaysBlockedById(id);
  }

  @Post()
  async createDayBlocked(@Body() app: any): Promise<any> {
    return await this.daysBlockedService.createDayBlocked(app);
  }

  @Put()
  async updateDayBlocked(@Body() app: any): Promise<any> {
    return await this.daysBlockedService.updateDayBlocked(app);
  }
}
