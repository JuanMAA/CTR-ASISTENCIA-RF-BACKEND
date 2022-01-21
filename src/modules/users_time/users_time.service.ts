import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersTimeDto } from './users_time.dto';
import { UsersTime } from './users_time.entity';

@Injectable()
export class UsersTimeService {
  constructor(
    @InjectRepository(UsersTime)
    private readonly UsersTimeRepository: Repository<UsersTime>,
  ) {}

  async getUsersTime(): Promise<any[]> {
    const query = this.UsersTimeRepository.createQueryBuilder('users_time')
      .select('users_time')
      .orderBy('users_time.id', 'ASC');
    const UserTime = await query.getMany();
    return UserTime;
  }

  async getUsersTimeById(id: number): Promise<any> {
    const query = this.UsersTimeRepository.createQueryBuilder('users_time')
      .select('users_time')
      .where(`users_time.id = :id`, { id: id });

    try {
      const UsersTime = await query.getOne();
      return UsersTime;
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

  async deleteUsersTimeById(id: number): Promise<any> {
    if (id === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Debe incluir id.',
        },
        400,
      );
    }
    let schedule_dt = new UsersTimeDto();

    try {
      schedule_dt = await this.UsersTimeRepository.save(schedule_dt);
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


  async createUserTime(newUserTime: any) {
    try {
      const UserTime = await this.UsersTimeRepository.save(newUserTime);
      newUserTime.id = UserTime.id;
      return UserTime;
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
    return await this.UsersTimeRepository.findOne({
      id,
    });
  }

  async updateUserTime(schedule: any) {
    try {
      schedule = await this.UsersTimeRepository.save(schedule);
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
