import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POT } from './entities/pot.entity';
import { EnsayoService } from '../ensayo/ensayo.service';

@Injectable()
export class PotService {

  constructor(
    @InjectRepository(POT) private potRepository: Repository<POT>,
    private ensayoService: EnsayoService,
  ) {}

  async upsert(items: Record<string, any>[]): Promise<number> {
    const now = new Date();
    for (const item of items) {
      const { id, ...datos } = item;
      const existente = id ? await this.potRepository.findOne({ where: { id } }) : null;
      if (existente) {
        await this.potRepository.update(id, { ...datos, syncedAt: now });
      } else {
        await this.potRepository.save({ id, ...datos, syncedAt: now } as POT);
      }
    }
    return items.length;
  }

  async findByCampanaIds(campanaIds: number[]): Promise<POT[]> {
    if (!campanaIds.length) return [];
    return this.potRepository
      .createQueryBuilder('p')
      .where('p.campanaId IN (:...ids)', { ids: campanaIds })
      .getMany();
  }

  async softDelete(id: number): Promise<void> {
    const now = new Date();
    await this.potRepository.update(id, { deletedAt: now, syncedAt: now });
    await this.ensayoService.softDeleteByPotId(id);
  }

  async softDeleteByCampanaId(campanaId: number): Promise<void> {
    const pots = await this.potRepository.find({ where: { campanaId } });
    for (const pot of pots) {
      await this.softDelete(pot.id);
    }
  }
}
