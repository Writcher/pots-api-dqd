import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoHincado } from './entities/tipo-hincado.entity';
import { TipoHincadoService } from './tipo-hincado.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoHincado])],
  providers: [TipoHincadoService],
  exports: [TipoHincadoService],
})
export class TipoHincadoModule {}
