import { Injectable } from '@nestjs/common';
import { PotService } from '../../core/pot/pot.service';
import { EnsayoService } from '../../core/ensayo/ensayo.service';
import { UploadPayload } from './types/sync.types';
import { CampanaService } from 'src/modules/core/campana/campana.service';

@Injectable()
export class SyncService {

  constructor(
    private campanaService: CampanaService,
    private potService: PotService,
    private ensayoService: EnsayoService,
  ) {}

  async upload(payload: UploadPayload) {
    const { campanas, pots, ensayos, deviceId } = payload;
    const now = new Date();

    const results = {
      campanas: await this.campanaService.upsert(campanas, deviceId),
      pots:     await this.potService.upsert(pots),
      ensayos:  await this.ensayoService.upsert(ensayos),
    };

    return { ok: true, syncedAt: now, results };
  }

  async download(since?: number) {
    const sinceDate = since ? new Date(since) : new Date(0);

    const campanas = await this.campanaService.findSince(sinceDate);
    const pots     = await this.potService.findByCampanaIds(campanas.map(c => c.id));
    const ensayos  = await this.ensayoService.findByPotIds(pots.map(p => p.id));

    return { campanas, pots, ensayos, timestamp: Date.now() };
  }

  async softDelete(tipo: 'campana' | 'pot' | 'ensayo', id: number) {
    if (tipo === 'campana') await this.campanaService.softDelete(id);
    if (tipo === 'pot')     await this.potService.softDelete(id);
    if (tipo === 'ensayo')  await this.ensayoService.softDelete(id);
    return { ok: true };
  }
}
