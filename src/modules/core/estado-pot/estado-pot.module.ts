import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoPot } from './entities/estado-pot.entity';
import { EstadoPotService } from './estado-pot.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoPot])],
  providers: [EstadoPotService],
  exports: [EstadoPotService],
})
export class EstadoPotModule {}