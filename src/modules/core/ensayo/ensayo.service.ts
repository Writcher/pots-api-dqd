import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ensayo } from './entities/ensayo.entity';

@Injectable()
export class EnsayoService {

  constructor(
    @InjectRepository(Ensayo) private ensayoRepository: Repository<Ensayo>,
  ) {}

  async upsert(items: Record<string, any>[]): Promise<number> {
    const now = new Date();
    for (const item of items) {
      const { id, ...datos } = item;
      const existente = id ? await this.ensayoRepository.findOne({ where: { id } }) : null;
      if (existente) {
        await this.ensayoRepository.update(id, { ...datos, syncedAt: now });
      } else {
        await this.ensayoRepository.save({ id, ...datos, syncedAt: now } as Ensayo);
      }
    }
    return items.length;
  }

  async findByPotIds(potIds: number[]): Promise<Ensayo[]> {
    if (!potIds.length) return [];
    return this.ensayoRepository
      .createQueryBuilder('e')
      .where('e.potId IN (:...ids)', { ids: potIds })
      .getMany();
  }

  async softDelete(id: number): Promise<void> {
    const now = new Date();
    await this.ensayoRepository.update(id, { deletedAt: now, syncedAt: now });
  }

  async softDeleteByPotId(potId: number): Promise<void> {
    const now = new Date();
    await this.ensayoRepository
      .createQueryBuilder()
      .update()
      .set({ deletedAt: now, syncedAt: now })
      .where('potId = :potId', { potId })
      .execute();
  }
}
