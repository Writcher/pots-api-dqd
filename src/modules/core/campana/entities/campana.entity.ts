import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EstadoCampana } from '../../estado-campana/entities/estado-campana.entity';
import { POT } from '../../pot/entities/pot.entity';
import { CampanaTipoEnsayo } from '../../campana-tipo-ensayo/entities/campana-tipo-ensayo.entity';
import { Perfil } from '../../perfil/entities/perfil.entity';

@Entity('campana')
export class Campana {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column({ nullable: true })
  deviceId!: string;

  @Column()
  cliente!: string;

  @Column()
  proyecto!: string;

  @Column()
  numero!: string;

  @Column({ nullable: true })
  fechaInicio!: string;

  @Column()
  estadoCampanaId!: number;

  @ManyToOne(() => EstadoCampana)
  @JoinColumn({ name: 'estadoCampanaId' })
  estadoCampana!: EstadoCampana;

  @Column({ type: 'float' })
  limiteLateral!: number;

  @Column({ type: 'float' })
  limiteCompresion!: number;

  @Column({ type: 'float' })
  limiteTraccion!: number;

  @Column({ nullable: true })
  perfilMotorId!: number;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'perfilMotorId' })
  perfilMotor!: Perfil;

  @Column({ nullable: true })
  perfilEstandarId!: number;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'perfilEstandarId' })
  perfilEstandar!: Perfil;

  @Column({ type: 'float' })
  rechazoAnticipadoPct!: number;

  @Column({ type: 'float' })
  saturacionLitros!: number;

  @Column({ type: 'float' })
  longitudMotor!: number;

  @Column({ type: 'float' })
  longitudEstandar!: number;

  @Column({ nullable: true })
  dinamometroSerie!: string;

  @Column({ nullable: true })
  dinamometroCalibracion!: string;

  @Column({ nullable: true })
  reloj1Serie!: string;

  @Column({ nullable: true })
  reloj1Calibracion!: string;

  @Column({ nullable: true })
  reloj2Serie!: string;

  @Column({ nullable: true })
  reloj2Calibracion!: string;

  @Column({ nullable: true })
  ref1!: string;

  @Column({ nullable: true })
  ref2!: string;

  @Column({ nullable: true })
  nota!: string;

  @Column({ type: 'datetime', nullable: true })
  modifiedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  syncedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt!: Date;

  @OneToMany(() => POT, pot => pot.campana)
  pots!: POT[];

  @OneToMany(() => CampanaTipoEnsayo, cte => cte.campana)
  tiposEnsayo!: CampanaTipoEnsayo[];
}