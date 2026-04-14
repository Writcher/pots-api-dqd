import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Ensayo } from '../../ensayo/entities/ensayo.entity';
import { Campana } from '../../campana/entities/campana.entity';
import { Perfil } from '../../perfil/entities/perfil.entity';
import { TipoEnsayo } from '../../tipo-ensayo/entities/tipo-ensayo.entity';
import { TipoHincado } from '../../tipo-hincado/entities/tipo-hincado.entity';
import { EstadoPot } from '../../estado-pot/entities/estado-pot.entity';

@Entity('pot')
export class POT {
  @PrimaryColumn({ type: 'int' })
  id!: number;

  @Column()
  campanaId!: number;

  @ManyToOne(() => Campana, campana => campana.pots)
  @JoinColumn({ name: 'campanaId' })
  campana!: Campana;

  @Column()
  titulo!: string;

  @Column()
  perfilId!: number;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'perfilId' })
  perfil!: Perfil;

  @Column()
  tipoEnsayoId!: number;

  @ManyToOne(() => TipoEnsayo)
  @JoinColumn({ name: 'tipoEnsayoId' })
  tipoEnsayo!: TipoEnsayo;

  @Column({ type: 'float' })
  empotramientoIdeal!: number;

  @Column({ default: false })
  saturacionPrevista!: boolean;

  @Column()
  estadoPotId!: number;

  @ManyToOne(() => EstadoPot)
  @JoinColumn({ name: 'estadoPotId' })
  estadoPot!: EstadoPot;

  @Column({ nullable: true })
  motivoRechazo!: string;

  @Column({ nullable: true })
  coordX!: string;

  @Column({ nullable: true })
  coordY!: string;

  @Column({ type: 'float', nullable: true })
  longitudHinca!: number;

  @Column({ type: 'float', nullable: true })
  empotramientoReal!: number;

  @Column({ default: false })
  saturado!: boolean;

  @Column()
  tipoHincadoId!: number;

  @ManyToOne(() => TipoHincado)
  @JoinColumn({ name: 'tipoHincadoId' })
  tipoHincado!: TipoHincado;

  @Column({ type: 'float', nullable: true })
  t05!: number;

  @Column({ type: 'float', nullable: true })
  t10!: number;

  @Column({ type: 'float', nullable: true })
  t15!: number;

  @Column({ type: 'float', nullable: true })
  t20!: number;

  @Column({ type: 'float', nullable: true })
  t25!: number;

  @Column({ type: 'float', nullable: true })
  t30!: number;

  @Column({ nullable: true })
  observacion!: string;

  @Column({ type: 'datetime', nullable: true })
  modifiedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  syncedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  deletedAt!: Date;

  @OneToMany(() => Ensayo, ensayo => ensayo.pot)
  ensayos!: Ensayo[];
}