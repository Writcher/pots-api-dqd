import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Ensayo } from '../../ensayo/entities/ensayo.entity';
import { Campana } from '../../campana/entities/campana.entity';

@Entity('pots')
export class POT {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  campanaId: number;

  @ManyToOne(() => Campana, campana => campana.pots)
  @JoinColumn({ name: 'campanaId' })
  campana: Campana;

  @Column()
  titulo: string;

  @Column()
  perfil: string;

  @Column()
  tipoCarga: string;

  @Column({ type: 'float', default: 1.5 })
  empotramientoIdeal: number;

  @Column({ default: false })
  saturacionPrevista: boolean;

  @Column({ default: 'Pendiente' })
  estado: string;

  @Column({ nullable: true })
  motivoRechazo: string;

  @Column({ nullable: true })
  coordX: string;

  @Column({ nullable: true })
  coordY: string;

  @Column({ type: 'float', nullable: true })
  longReal: number;

  @Column({ type: 'float', nullable: true })
  empReal: number;

  @Column({ default: false })
  saturado: boolean;

  @Column({ type: 'float', nullable: true })
  t05: number;

  @Column({ type: 'float', nullable: true })
  t10: number;

  @Column({ type: 'float', nullable: true })
  t15: number;

  @Column({ type: 'float', nullable: true })
  t20: number;

  @Column({ type: 'float', nullable: true })
  t25: number;

  @Column({ type: 'float', nullable: true })
  t30: number;

  @Column({ nullable: true })
  dinSerie: string;

  @Column({ nullable: true })
  dinCal: string;

  @Column({ nullable: true })
  relojSerie: string;

  @Column({ nullable: true })
  relojCal: string;

  @Column({ nullable: true })
  obs: string;

  @Column({ type: 'bigint' })
  fechaMod: number;

  @Column({ nullable: true })
  syncedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => Ensayo, ensayo => ensayo.pot)
  ensayos: Ensayo[];
}