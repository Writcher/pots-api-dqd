import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CampanaTipoEnsayo } from "./entities/campana-tipo-ensayo.entity";
import { Repository } from "typeorm";

@Injectable()
export class CampanaTipoEnsayoService {
    constructor(
        @InjectRepository(CampanaTipoEnsayo) private campanaTipoEnsayoRepository: Repository<CampanaTipoEnsayo>
    ) { }

    async upsert(items: Record<string, any>[]): Promise<number> {
        const now = new Date();
        for (const item of items) {
            const { id, ...datos } = item;
            const existente = id ? await this.campanaTipoEnsayoRepository.findOne({ where: { id } }) : null;
            if (existente) {
                await this.campanaTipoEnsayoRepository.update(id, { ...datos, syncedAt: now });
            } else {
                await this.campanaTipoEnsayoRepository.save({ id, ...datos, syncedAt: now } as CampanaTipoEnsayo)
            }
        }
        return items.length
    }

    async findByCampanaIds(campanaIds: number[]): Promise<CampanaTipoEnsayo[]> {
        if (!campanaIds.length) return [];
        return this.campanaTipoEnsayoRepository
            .createQueryBuilder('cte')
            .where('cte.campanaId IN (:...ids)', { ids: campanaIds })
            .getMany();
    }

    async softDeleteByCampanaId(campanaId: number): Promise<void> {
        const now = new Date();
        await this.campanaTipoEnsayoRepository
            .createQueryBuilder()
            .update()
            .set({ deletedAt: now, syncedAt: now })
            .where('campanaId = :campanaId', { campanaId })
            .execute();
    }
}