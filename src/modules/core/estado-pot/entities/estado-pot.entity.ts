import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('estadoPot')
export class EstadoPot {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
