import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campana } from '../entities/campana.entity';
import { POT } from '../entities/pot.entity';
import { Ensayo } from '../entities/ensayo.entity';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campana, POT, Ensayo])],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}