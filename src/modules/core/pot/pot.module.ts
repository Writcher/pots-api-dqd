import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotService } from './pot.service';
import { EnsayoModule } from '../ensayo/ensayo.module';
import { POT } from './entities/pot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([POT]), EnsayoModule],
  providers: [PotService],
  exports: [PotService],
})
export class PotModule {}
