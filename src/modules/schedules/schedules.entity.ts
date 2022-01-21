import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    name: 'descripcion',
  })
  descripcion: string;
}
