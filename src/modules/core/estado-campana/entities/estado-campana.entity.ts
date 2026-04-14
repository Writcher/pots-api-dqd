import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('estadoCampana')
export class EstadoCampana {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
