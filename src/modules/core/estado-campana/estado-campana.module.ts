import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCampana } from './entities/estado-campana.entity';
import { EstadoCampanaService } from './estado-campana.service';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCampana])],
  providers: [EstadoCampanaService],
  exports: [EstadoCampanaService],
})
export class EstadoCampanaModule {}
