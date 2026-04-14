import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampanaTipoEnsayo } from './entities/campana-tipo-ensayo.entity';
import { CampanaTipoEnsayoService } from './campana-tipo-ensayo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampanaTipoEnsayo])],
  providers: [CampanaTipoEnsayoService],
  exports: [CampanaTipoEnsayoService],
})
export class CampanaTipoEnsayoModule {}