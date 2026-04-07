import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campana } from '../entities/campana.entity';
import { POT } from '../entities/pot.entity';
import { Ensayo } from '../entities/ensayo.entity';
import { UploadPayload } from './sync.types';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(Campana) private campanaRepo: Repository<Campana>,
    @InjectRepository(POT) private potRepo: Repository<POT>,
    @InjectRepository(Ensayo) private ensayoRepo: Repository<Ensayo>,
  ) { }

  private async upsert<T extends object>(
    repo: Repository<T>,
    items: Record<string, any>[],
    extra: Record<string, any> = {},
  ): Promise<number> {
    const now = new Date();
    for (const item of items) {
      const { id, ...datos } = item;
      const existente = id ? await repo.findOne({ where: { id } as any }) : null;
      if (existente) {
        await repo.update(id, { ...datos, ...extra, syncedAt: now } as any);
      } else {
        await repo.save({ ...datos, ...extra, syncedAt: now } as any);
      }
    }
    return items.length;
  }

  async upload(payload: UploadPayload) {
    const { campanas, pots, ensayos, deviceId } = payload;
    const now = new Date();

    const results = {
      campanas: await this.upsert(this.campanaRepo, campanas, { deviceId }),
      pots:     await this.upsert(this.potRepo, pots),
      ensayos:  await this.upsert(this.ensayoRepo, ensayos),
    };

    return { ok: true, syncedAt: now, results };
  }

  async download(since?: number, deviceId?: string) {
    const sinceDate = since ? new Date(since) : new Date(0);

    const campanas = await this.campanaRepo
      .createQueryBuilder('c')
      .where('c.syncedAt > :since', { since: sinceDate })
      .andWhere(deviceId ? 'c.deviceId != :deviceId' : '1=1', { deviceId })
      .getMany();

    const potIds = campanas.map(c => c.id);

    const pots = potIds.length ? await this.potRepo
      .createQueryBuilder('p')
      .where('p.campanaId IN (:...ids)', { ids: potIds })
      .getMany() : [];

    const potIdList = pots.map(p => p.id);

    const ensayos = potIdList.length ? await this.ensayoRepo
      .createQueryBuilder('e')
      .where('e.potId IN (:...ids)', { ids: potIdList })
      .getMany() : [];

    return { campanas, pots, ensayos, timestamp: Date.now() };
  }

  async softDelete(tipo: 'campana' | 'pot' | 'ensayo', id: number) {
    const now = new Date();
    if (tipo === 'campana') {
      await this.campanaRepo.update(id, { deletedAt: now, syncedAt: now });
      // Soft delete en cascada
      const pots = await this.potRepo.find({ where: { campanaId: id } });
      for (const p of pots) {
        await this.potRepo.update(p.id, { deletedAt: now, syncedAt: now });
        await this.ensayoRepo
          .createQueryBuilder()
          .update()
          .set({ deletedAt: now, syncedAt: now })
          .where('potId = :id', { id: p.id })
          .execute();
      }
    } else if (tipo === 'pot') {
      await this.potRepo.update(id, { deletedAt: now, syncedAt: now });
      await this.ensayoRepo
        .createQueryBuilder()
        .update()
        .set({ deletedAt: now, syncedAt: now })
        .where('potId = :id', { id })
        .execute();
    } else {
      await this.ensayoRepo.update(id, { deletedAt: now, syncedAt: now });
    }
    return { ok: true };
  }
}