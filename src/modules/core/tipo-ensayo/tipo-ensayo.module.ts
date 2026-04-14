import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEnsayo } from './entities/tipo-ensayo.entity';
import { TipoEnsayoService } from './tipo-ensayo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEnsayo])],
  providers: [TipoEnsayoService],
  exports: [TipoEnsayoService],
})
export class TipoEnsayoModule {}
