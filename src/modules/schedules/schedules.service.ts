import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SchedulesDto } from './schedules.dto';
import { Schedules } from './schedules.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private readonly SchedulesRepository: Repository<Schedules>,
  ) {}

  async getSchedules(): Promise<any[]> {
    const query = this.SchedulesRepository.createQueryBuilder('schedules')
      .select('schedules')
      .orderBy('schedules.id', 'ASC');
    const Schedule = await query.getMany();
    return Schedule;
  }

  async getSchedulesById(id: number): Promise<any> {
    const query = this.SchedulesRepository.createQueryBuilder('schedules')
      .select('schedules')
      .where(`schedules.id = :id`, { id: id });

    try {
      const Schedules = await query.getOne();
      return Schedules;
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

  async deleteSchedulesById(id: number): Promise<any> {
    if (id === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir id.',
        },
        400,
      );
    }
    let schedule_dt: any = new SchedulesDto();

    try {
      schedule_dt = await this.SchedulesRepository.save(schedule_dt);
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
    return await this.SchedulesRepository.findOne({
      id,
    });
  }

  async createSchedule(newSchedule: any) {
    try {
      const Schedule = await this.SchedulesRepository.save(newSchedule);
      newSchedule.id = Schedule.id;
      return Schedule;
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
    return await this.SchedulesRepository.findOne({
      id,
    });
  }

  async updateSchedule(schedule: any) {
    try {
      schedule = await this.SchedulesRepository.save(schedule);
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
