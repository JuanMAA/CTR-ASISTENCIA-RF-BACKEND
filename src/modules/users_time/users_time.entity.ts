import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUser } from '../auth_user/auth_user.entity';

@Entity()
export class UsersTime {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  date: Date;

  @Column()
  day: Date;

  @Column('bool', {
    name: 'out',
  })
  out: boolean;

  @ManyToOne(() => AuthUser, (table: AuthUser) => table.id, {})
  @JoinColumn({ name: 'user_id' })
  @Column('integer', {
    name: 'user_id',
  })
  user_id: number;
}
