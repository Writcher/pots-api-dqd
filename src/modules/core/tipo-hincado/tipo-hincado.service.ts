import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoHincado } from './entities/tipo-hincado.entity';

@Injectable()
export class TipoHincadoService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'Hincado Directo' },
    { id: 2, nombre: 'Hincado Directo/Saturado' },
    { id: 3, nombre: 'Pre-Drill e Hincado Directo' },
    { id: 4, nombre: 'Micropilote Hincado Directo' },
  ];

  constructor(@InjectRepository(TipoHincado) private tipoHincadoRepository: Repository<TipoHincado>) {}

  async onModuleInit() {
    for (const item of TipoHincadoService.SEED) {
      await this.tipoHincadoRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<TipoHincado[]> {
    return this.tipoHincadoRepository.find();
  }
}
