import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoCampana } from './entities/estado-campana.entity';

@Injectable()
export class EstadoCampanaService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'Activa' },
    { id: 2, nombre: 'Cerrada' },
  ];

  constructor(@InjectRepository(EstadoCampana) private estadoCampanaRepository: Repository<EstadoCampana>) {}

  async onModuleInit() {
    for (const item of EstadoCampanaService.SEED) {
      await this.estadoCampanaRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<EstadoCampana[]> {
    return this.estadoCampanaRepository.find();
  }
}
