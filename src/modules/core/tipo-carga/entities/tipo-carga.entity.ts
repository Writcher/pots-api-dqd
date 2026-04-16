import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tipoCarga')
export class TipoCarga {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
