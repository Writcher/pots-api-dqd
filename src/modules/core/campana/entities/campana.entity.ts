import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn } from 'typeorm';
import { POT } from '../../pot/entities/pot.entity';

@Entity('campanas')
export class Campana {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  deviceId: string; // ID del dispositivo que creó la campaña

  @Column()
  cliente: string;

  @Column()
  proyecto: string;

  @Column()
  numeroCampana: string;

  @Column({ nullable: true })
  fechaInicio: string;

  @Column({ default: 'Activa' })
  estado: string;

  @Column({ type: 'float', default: 25 })
  limLateral: number;

  @Column({ type: 'float', default: 15 })
  limCompresion: number;

  @Column({ type: 'float', default: 15 })
  limTraccion: number;

  @Column({ type: 'float', default: 200 })
  pctRechazo: number;

  @Column({ type: 'float', default: 20 })
  litros: number;

  @Column({ type: 'float', default: 4.0 })
  longMotor: number;

  @Column({ type: 'float', default: 3.5 })
  longEstandar: number;

  @Column({ nullable: true })
  nota: string;

  @Column({ nullable: true })
  ref1: string;

  @Column({ nullable: true })
  ref2: string;

  @Column({ nullable: true })
  logoCliente: string;

  @Column({ default: 'No usa' })
  secLatComp: string;

  @Column({ default: 'No usa' })
  secLatTrac: string;

  @Column({ default: 'No usa' })
  secCompTrac: string;

  @Column({ default: false })
  soloLateral: boolean;

  @Column({ default: false })
  soloCompresion: boolean;

  @Column({ default: false })
  soloTraccion: boolean;

  @Column({ nullable: true })
  dinSerie: string;

  @Column({ nullable: true })
  dinCal: string;

  @Column({ nullable: true })
  relojSerie: string;

  @Column({ nullable: true })
  relojCal: string;

  @Column({ type: 'bigint' })
  fechaMod: number;

  @Column({ nullable: true })
  syncedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => POT, pot => pot.campana)
  pots: POT[];
}