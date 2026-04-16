import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tipoHincado')
export class TipoHincado {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
