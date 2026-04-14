import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { PerfilService } from './perfil.service';

@Module({
  imports: [TypeOrmModule.forFeature([Perfil])],
  providers: [PerfilService],
  exports: [PerfilService],
})
export class PerfilModule {}