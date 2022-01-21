import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedules } from '../schedules/schedules.entity';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'password',
    length: 128,
  })
  password: string;

  @Column()
  last_login: Date;

  @Column()
  date_joined: Date;

  @Column('bool', {
    name: 'is_superuser',
  })
  is_superuser: boolean;

  @Column('varchar', {
    name: 'username',
    length: 255,
  })
  username: string;

  @Column('varchar', {
    name: 'first_name',
    length: 255,
  })
  first_name: string;

  @Column('varchar', {
    name: 'last_name',
    length: 255,
  })
  last_name: string;

  @Column('varchar', {
    name: 'email',
    length: 254,
  })
  email: string;

  @Column('bool', {
    name: 'is_staff',
  })
  is_staff: boolean;

  @Column('bool', {
    name: 'is_active',
  })
  is_active: boolean;

  @ManyToOne(() => Schedules, (schedules) => schedules.id)
  @JoinColumn({ name: 'schedule_id' })
  @Column({
    type: 'integer',
    name: 'schedule_id',
  })
  schedule_id: number;
}
