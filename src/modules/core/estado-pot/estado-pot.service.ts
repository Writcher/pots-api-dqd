import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoPot } from './entities/estado-pot.entity';

@Injectable()
export class EstadoPotService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Completado' },
    { id: 3, nombre: 'Rechazado' },
  ];

  constructor(@InjectRepository(EstadoPot) private estadoPotRepository: Repository<EstadoPot>) {}

  async onModuleInit() {
    for (const item of EstadoPotService.SEED) {
      await this.estadoPotRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<EstadoPot[]> {
    return this.estadoPotRepository.find();
  }
}