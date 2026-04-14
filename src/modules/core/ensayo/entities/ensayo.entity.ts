import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { POT } from '../../pot/entities/pot.entity';
import { TipoCarga } from '../../tipo-carga/entities/tipo-carga.entity';

@Entity('ensayo')
export class Ensayo {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column()
  potId!: number;

  @ManyToOne(() => POT, pot => pot.ensayos)
  @JoinColumn({ name: 'potId' })
  pot!: POT;

  @Column()
  tipoCargaId!: number;

  @ManyToOne(() => TipoCarga)
  @JoinColumn({ name: 'tipoCargaId' })
  tipoCarga!: TipoCarga;

  @Column()
  escalon!: number;

  @Column({ type: 'float' })
  porcentajeCarga!: number;

  @Column({ type: 'float' })
  cargaTeorica!: number;

  @Column({ type: 'float', nullable: true })
  cargaReal!: number;

  @Column({ type: 'float', nullable: true })
  elasticoR1!: number;

  @Column({ type: 'float', nullable: true })
  elasticoR2!: number;

  @Column({ type: 'float', nullable: true })
  plasticoR1!: number;

  @Column({ type: 'float', nullable: true })
  plasticoR2!: number;

  @Column({ type: 'datetime', nullable: true })
  fechaEnsayo!: Date;

  @Column({ type: 'datetime', nullable: true })
  modifiedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  syncedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt!: Date;
}