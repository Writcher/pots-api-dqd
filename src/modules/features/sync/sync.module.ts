import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { PotModule } from '../../core/pot/pot.module';
import { EnsayoModule } from '../../core/ensayo/ensayo.module';
import { CampanaModule } from 'src/modules/core/campana/campana.module';
import { CampanaTipoEnsayoModule } from 'src/modules/core/campana-tipo-ensayo/campana-tipo-ensayo.module';
import { EstadoCampanaModule } from 'src/modules/core/estado-campana/estado-campana.module';
import { EstadoPotModule } from 'src/modules/core/estado-pot/estado-pot.module';
import { TipoEnsayoModule } from 'src/modules/core/tipo-ensayo/tipo-ensayo.module';
import { TipoCargaModule } from 'src/modules/core/tipo-carga/tipo-carga.module';
import { PerfilModule } from 'src/modules/core/perfil/perfil.module';
import { TipoHincadoModule } from 'src/modules/core/tipo-hincado/tipo-hincado.module';

@Module({
  imports: [
    //catalogos
    EstadoCampanaModule,
    EstadoPotModule,
    TipoEnsayoModule,
    TipoCargaModule,
    TipoHincadoModule,
    PerfilModule,
    //entidades
    CampanaModule, 
    PotModule, 
    EnsayoModule,
    CampanaTipoEnsayoModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
