import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TurnsDto } from './turns.dto';
import { Turns } from './turns.entity';

@Injectable()
export class TurnsService {
  constructor(
    @InjectRepository(Turns)
    private readonly TurnsRepository: Repository<Turns>,
  ) {}

  async getTurns(): Promise<any[]> {
    const query = this.TurnsRepository.createQueryBuilder('turns')
      .select('turns')
      .orderBy('turns.id', 'ASC');
    const Turn = await query.getMany();
    return Turn;
  }

  async getTurnsById(id: number): Promise<any> {
    const query = this.TurnsRepository.createQueryBuilder('turns')
      .select('turns')
      .where(`turns.id = :id`, { id: id });

    try {
      const Turns = await query.getOne();
      return Turns;
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

  async deleteTurnsById(id: number): Promise<any> {
    if (id === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir id.',
        },
        400,
      );
    }
    try {
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
    return await this.TurnsRepository.findOne({
      id,
    });
  }

  async createTurn(newTurn: any) {
    try {
      const Turn = await this.TurnsRepository.save(newTurn);
      newTurn.id = Turn.id;
      return Turn;
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
    return await this.TurnsRepository.findOne({
      id,
    });
  }

  async updateTurn(schedule: any) {
    try {
      schedule = await this.TurnsRepository.save(schedule);
    } catch (ex) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ex.message,
        },
        500,
      );
    }
    return schedule;
  }
}
