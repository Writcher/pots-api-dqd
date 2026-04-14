import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tiposCarga')
export class TipoCarga {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
