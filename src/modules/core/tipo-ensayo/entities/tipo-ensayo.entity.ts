import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tipoEnsayo')
export class TipoEnsayo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
