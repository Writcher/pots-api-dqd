import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tiposEnsayo')
export class TipoEnsayo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;
}
