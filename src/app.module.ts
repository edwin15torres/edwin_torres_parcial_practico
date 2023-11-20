/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AeropuertoAerolineaModule } from './aeropuerto-aerolinea/aeropuerto-aerolinea.module';
import { AerolineaAeropuertoModule } from './aerolinea-aeropuerto/aerolinea-aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';

@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    AeropuertoAerolineaModule,
    AerolineaAeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Rosa16',
      database: 'tres',
      entities: [
        AeropuertoEntity,
        AerolineaEntity,

      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
