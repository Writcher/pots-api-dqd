import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campana } from './entities/campana.entity';
import { PotService } from '../pot/pot.service';

@Injectable()
export class CampanaService {

  constructor(
    @InjectRepository(Campana) private repo: Repository<Campana>,
    private potService: PotService,
  ) {}

  async upsert(items: Record<string, any>[], deviceId: string): Promise<number> {
    const now = new Date();
    for (const item of items) {
      const { id, ...datos } = item;
      const existente = id ? await this.repo.findOne({ where: { id } }) : null;
      if (existente) {
        await this.repo.update(id, { ...datos, deviceId, syncedAt: now });
      } else {
        await this.repo.save({ ...datos, deviceId, syncedAt: now } as Campana);
      }
    }
    return items.length;
  }

  async findSince(since: Date, deviceId?: string): Promise<Campana[]> {
    return this.repo
      .createQueryBuilder('c')
      .where('c.syncedAt > :since', { since })
      .andWhere(deviceId ? 'c.deviceId != :deviceId' : '1=1', { deviceId })
      .getMany();
  }

  async softDelete(id: number): Promise<void> {
    const now = new Date();
    await this.repo.update(id, { deletedAt: now, syncedAt: now });
    await this.potService.softDeleteByCampanaId(id);
  }
}
