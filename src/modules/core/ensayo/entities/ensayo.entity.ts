import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { POT } from '../../pot/entities/pot.entity';

@Entity('ensayos')
export class Ensayo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column()
  potId: number;

  @ManyToOne(() => POT, pot => pot.ensayos)
  @JoinColumn({ name: 'potId' })
  pot: POT;

  @Column()
  campanaId: number;

  @Column()
  tipoCarga: string;

  @Column()
  numeroEscalon: number;

  @Column({ type: 'float' })
  porcentajeCarga: number;

  @Column({ type: 'float' })
  cargaTeorica: number;

  @Column({ type: 'float', nullable: true })
  cargaReal: number;

  @Column({ type: 'float', nullable: true })
  defElR1: number;

  @Column({ type: 'float', nullable: true })
  defElR2: number;

  @Column({ type: 'float', nullable: true })
  defPlR1: number;

  @Column({ type: 'float', nullable: true })
  defPlR2: number;

  @Column({ nullable: true })
  fechaEnsayo: string;

  @Column({ nullable: true })
  syncedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}