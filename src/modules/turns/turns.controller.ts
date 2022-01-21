import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TurnsService } from './turns.service';

@Controller('turns')
export class TurnsController {
  constructor(private readonly TurnService: TurnsService) {}

  @Get()
  async getTurns(): Promise<any> {
    return this.TurnService.getTurns();
  }

  @Get(':id')
  async getTurnsById(@Param('id') id): Promise<any> {
    return this.TurnService.getTurnsById(id);
  }

  @Delete(':id')
  async deleteTurnsById(@Param('id') id): Promise<any> {
    return this.TurnService.deleteTurnsById(id);
  }

  @Post()
  async createTurn(@Body() app: any): Promise<any> {
    return await this.TurnService.createTurn(app);
  }

  @Put()
  async updateTurn(@Body() app: any): Promise<any> {
    return await this.TurnService.updateTurn(app);
  }
}
