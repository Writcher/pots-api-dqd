import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Campana } from '../../campana/entities/campana.entity';
import { TipoEnsayo } from '../../tipo-ensayo/entities/tipo-ensayo.entity';

@Entity('campanaTipoEnsayo')
export class CampanaTipoEnsayo {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column()
  campanaId!: number;

  @ManyToOne(() => Campana, c => c.tiposEnsayo)
  @JoinColumn({ name: 'campanaId' })
  campana!: Campana;

  @Column()
  tipoEnsayoId!: number;

  @ManyToOne(() => TipoEnsayo)
  @JoinColumn({ name: 'tipoEnsayoId' })
  tipoEnsayo!: TipoEnsayo;

  @Column({ nullable: true })
  direccion!: string;

  @Column({ type: 'datetime', nullable: true })
  modifiedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  syncedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt!: Date;
}