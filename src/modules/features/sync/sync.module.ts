import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { PotModule } from '../../core/pot/pot.module';
import { EnsayoModule } from '../../core/ensayo/ensayo.module';
import { CampanaModule } from 'src/modules/core/campana/campana.module';

@Module({
  imports: [CampanaModule, PotModule, EnsayoModule],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
