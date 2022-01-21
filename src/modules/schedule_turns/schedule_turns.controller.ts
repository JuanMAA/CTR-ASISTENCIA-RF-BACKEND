import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ScheduleTurnsService } from './schedule_turns.service';

@Controller('schedule_turns')
export class ScheduleTurnsController {
  constructor(private readonly scheduleTurnsService: ScheduleTurnsService) {}

  @Get()
  async getScheduleTurns(): Promise<any> {
    return this.scheduleTurnsService.getScheduleTurns();
  }

  @Get(':id')
  async getScheduleTurnsById(@Param('id') id): Promise<any> {
    return this.scheduleTurnsService.getScheduleTurnsById(id);
  }

  @Delete(':id')
  async deleteScheduleTurnsById(@Param('id') id): Promise<any> {
    return this.scheduleTurnsService.deleteScheduleTurnsById(id);
  }

  @Post()
  async createScheduleTurn(@Body() app: any): Promise<any> {
    return await this.scheduleTurnsService.createScheduleTurn(app);
  }

  @Put()
  async updateScheduleTurn(@Body() app: any): Promise<any> {
    return await this.scheduleTurnsService.updateScheduleTurn(app);
  }
}
