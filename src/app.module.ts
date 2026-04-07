import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campana } from './entities/campana.entity';
import { POT } from './entities/pot.entity';
import { Ensayo } from './entities/ensayo.entity';
import { SyncModule } from './sync/sync.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host:     config.get('DB_HOST'),
        port:     parseInt(config.get('DB_PORT') ?? '1433'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Campana, POT, Ensayo],
        synchronize: true,
        options: {
          encrypt: false, 
          trustServerCertificate: true,
        },
      }),
    }),
    SyncModule,
  ],
})
export class AppModule {}