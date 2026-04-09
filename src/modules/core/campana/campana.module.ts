import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campana } from './entities/campana.entity';
import { CampanaService } from './campana.service';
import { PotModule } from '../pot/pot.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campana]), PotModule],
  providers: [CampanaService],
  exports: [CampanaService],
})
export class CampanaModule {}
