import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tiposHincado')
export class TipoHincado {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
