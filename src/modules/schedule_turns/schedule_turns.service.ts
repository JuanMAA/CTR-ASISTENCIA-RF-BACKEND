import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScheduleTurnsDto } from './schedule_turns.dto';
import { ScheduleTurns } from './schedule_turns.entity';

@Injectable()
export class ScheduleTurnsService {
  constructor(
    @InjectRepository(ScheduleTurns)
    private readonly scheduleTurnsRepository: Repository<ScheduleTurns>,
  ) {}

  async getScheduleTurns(): Promise<any[]> {
    const query = this.scheduleTurnsRepository
      .createQueryBuilder('schedule_turns')
      .select('schedule_turns')
      .orderBy('schedule_turns.id', 'ASC');
    const scheduleTurn = await query.getMany();
    return scheduleTurn;
  }

  async getScheduleTurnsById(id: number): Promise<any> {
    const query = this.scheduleTurnsRepository
      .createQueryBuilder('schedule_turns')
      .select('schedule_turns')
      .where(`schedule_turns.id = :id`, { id: id });

    try {
      const scheduleTurns = await query.getOne();
      return scheduleTurns;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async deleteScheduleTurnsById(id: number): Promise<any> {
    if (id === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir id.',
        },
        400,
      );
    }
    let schedule_turn = new ScheduleTurnsDto();

    try {
      schedule_turn = await this.scheduleTurnsRepository.save(schedule_turn);
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async findPaisById(id: number): Promise<any> {
    return await this.scheduleTurnsRepository.findOne({
      id,
    });
  }

  async createScheduleTurn(newScheduleTurn: any) {
    try {
      const scheduleTurn = await this.scheduleTurnsRepository.save(
        newScheduleTurn,
      );
      newScheduleTurn.id = scheduleTurn.id;
      return scheduleTurn;
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
  }

  async findByIdSwitch(id: number): Promise<any> {
    return await this.scheduleTurnsRepository.findOne({
      id,
    });
  }

  async updateScheduleTurn(schedule_turn: any) {
    try {
      schedule_turn = await this.scheduleTurnsRepository.save(schedule_turn);
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
    return schedule_turn;
  }
}
