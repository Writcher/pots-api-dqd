import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfil } from './entities/perfil.entity';

@Injectable()
export class PerfilService implements OnModuleInit {
  private static readonly SEED: Array<{ id: number; nombre: string, tipo: string }> = [
    { id: 1, nombre: 'W6x15', tipo: 'MOTOR' },
    { id: 2, nombre: 'W6x12', tipo: 'MOTOR' },
    { id: 3, nombre: 'W6x9', tipo: 'MOTOR' },
    { id: 4, nombre: 'W6x14', tipo: 'MOTOR' },
    { id: 5, nombre: 'W8x13', tipo: 'MOTOR' },
    { id: 6, nombre: 'W6x8.5', tipo: 'MOTOR' },
    { id: 7, nombre: 'W6x8.5', tipo: 'ESTANDAR' },
    { id: 8, nombre: 'W6x9', tipo: 'ESTANDAR' },
    { id: 9, nombre: 'W6x8', tipo: 'ESTANDAR' },
    { id: 10, nombre: 'W6x7', tipo: 'ESTANDAR' }
  ];

  constructor(
    @InjectRepository(Perfil) private prefilRepository: Repository<Perfil>
  ) {}

  async onModuleInit() {
    for (const item of PerfilService.SEED) {
      await this.prefilRepository.upsert(item, ['id']);
    }
  }

  findAll(): Promise<Perfil[]> {
    return this.prefilRepository.find();
  }

  findByTipo(tipo: string): Promise<Perfil[]> {
    return this.prefilRepository.find({ where: { tipo: tipo } });
  }

  async upsertPerfiles(items: Record<string, any>[]): Promise<number> {
    for (const item of items) {
      // Buscar si ya existe un perfil con el mismo nombre y tipo
      const existente = await this.prefilRepository.findOne({
        where: { nombre: item.nombre, tipo: item.tipo },
      });
      if (!existente) {
        await this.prefilRepository.save(item as Perfil);
      }
    }
    return items.length;
  }
}