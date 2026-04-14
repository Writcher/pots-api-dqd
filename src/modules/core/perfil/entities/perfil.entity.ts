import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('perfil')
export class Perfil {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;
}
