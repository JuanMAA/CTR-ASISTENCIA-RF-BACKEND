import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Turns {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'day',
  })
  day: string;

  @Column('varchar', {
    name: 'start',
  })
  start: string;

  @Column('varchar', {
    name: 'end',
  })
  end: string;

  @Column('integer', {
    name: 'max_end',
  })
  max_end: number;

  @Column('integer', {
    name: 'max_start',
  })
  max_start: number;

  @Column('integer', {
    name: 'min_start',
  })
  min_start: number;

  @Column('integer', {
    name: 'min_end',
  })
  min_end: number;
}
