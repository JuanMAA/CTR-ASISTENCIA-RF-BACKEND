import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUser } from '../auth_user/auth_user.entity';

@Entity()
export class DaysBlocked {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 255,
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    length: 255,
  })
  description: string;

  @Column()
  start_datetime: Date;

  @Column()
  end_datetime: Date;

  @Column('bool', {
    name: 'status',
  })
  status: boolean;

  @Column('bool', {
    name: 'block_list',
  })
  block_list: boolean;

  @ManyToOne(() => AuthUser, (table: AuthUser) => table.id, {})
  @JoinColumn({ name: 'user_id' })
  @Column('integer', {
    name: 'user_id',
  })
  user_id: number;
}
