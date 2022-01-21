import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DaysBlockedDto } from './days_blocked.dto';
import { DaysBlocked } from './days_blocked.entity';

@Injectable()
export class DaysBlockedService {
  constructor(
    @InjectRepository(DaysBlocked)
    private readonly scheduleTurnsRepository: Repository<DaysBlocked>,
  ) {}

  async getDaysBlocked(): Promise<any[]> {
    const query = this.scheduleTurnsRepository
      .createQueryBuilder('days_blocked')
      .select('days_blocked')
      .orderBy('days_blocked.id', 'ASC');
    const scheduleTurn = await query.getMany();
    return scheduleTurn;
  }

  async getDaysBlockedById(id: number): Promise<any> {
    const query = this.scheduleTurnsRepository
      .createQueryBuilder('days_blocked')
      .select('days_blocked')
      .where(`days_blocked.id = :id`, { id: id });

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

  async deleteDaysBlockedById(id: number): Promise<any> {
    if (id === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir id.',
        },
        400,
      );
    }
    let schedule_turn = new DaysBlockedDto();

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

  async createDayBlocked(newDayBlocked: any) {
    try {
      const scheduleTurn = await this.scheduleTurnsRepository.save(
        newDayBlocked,
      );
      newDayBlocked.id = scheduleTurn.id;
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

  async updateDayBlocked(schedule_turn: any) {
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
