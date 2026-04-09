import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ensayo } from './entities/ensayo.entity';
import { EnsayoService } from './ensayo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ensayo])],
  providers: [EnsayoService],
  exports: [EnsayoService],
})
export class EnsayoModule {}
