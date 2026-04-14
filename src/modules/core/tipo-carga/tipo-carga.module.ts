import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCarga } from './entities/tipo-carga.entity';
import { TipoCargaService } from './tipo-carga.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCarga])],
  providers: [TipoCargaService],
  exports: [TipoCargaService],
})
export class TipoCargaModule {}
