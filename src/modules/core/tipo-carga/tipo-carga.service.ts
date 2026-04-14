import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoCarga } from './entities/tipo-carga.entity';

@Injectable()
export class TipoCargaService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'LAT' },
    { id: 2, nombre: 'COMP' },
    { id: 3, nombre: 'TRAC' },
  ];

  constructor(@InjectRepository(TipoCarga) private tipoCargaRepository: Repository<TipoCarga>) {}

  async onModuleInit() {
    for (const item of TipoCargaService.SEED) {
      await this.tipoCargaRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<TipoCarga[]> {
    return this.tipoCargaRepository.find();
  }
}
