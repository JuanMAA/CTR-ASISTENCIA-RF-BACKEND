import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedules } from '../schedules/schedules.entity';
import { Turns } from '../turns/turns.entity';

@Entity()
export class ScheduleTurns {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @ManyToOne(() => Turns, (turn) => turn.id)
  @JoinColumn({ name: 'turn_id' })
  @Column('integer', {
    name: 'turn_id',
  })
  turn_id: number;

  @ManyToOne(() => Schedules, (schedule) => schedule.id)
  @JoinColumn({ name: 'schedule_id' })
  @Column('integer', {
    name: 'schedule_id',
  })
  schedule_id: number;

  @Column('integer', {
    name: 'week',
  })
  week: number;

  @Column('integer', {
    name: 'year',
  })
  year: number;
}
