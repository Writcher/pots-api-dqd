import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoEnsayo } from './entities/tipo-ensayo.entity';

@Injectable()
export class TipoEnsayoService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string }> = [
    { id: 1, nombre: 'LAT/COMP' },
    { id: 2, nombre: 'LAT/TRAC' },
    { id: 3, nombre: 'COMP/TRAC' },
    { id: 4, nombre: 'LAT' },
    { id: 5, nombre: 'COMP' },
    { id: 6, nombre: 'TRAC' },
  ];

  constructor(@InjectRepository(TipoEnsayo) private tipoEnsayoRepository: Repository<TipoEnsayo>) {}

  async onModuleInit() {
    for (const item of TipoEnsayoService.SEED) {
      await this.tipoEnsayoRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<TipoEnsayo[]> {
    return this.tipoEnsayoRepository.find();
  }
}
