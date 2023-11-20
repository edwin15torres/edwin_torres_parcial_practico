import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { AerolineaDto } from 'src/aerolinea/aerolinea.dto';
import { plainToInstance } from 'class-transformer';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';

@Controller('aeropuertos')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoAerolineaController {
  constructor(
    private readonly aeropuertoAerolineaService: AeropuertoAerolineaService,
  ) {}

  @Post(':aeropuertoId/aerolineas/:aerolineaId')
  async addAerolineaAeropuerto(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
  ) {
    return await this.aeropuertoAerolineaService.addAerolineaAeropuerto(
      aeropuertoId,
      aerolineaId,
    );
  }

  @Get(':aeropuertoId/aerolineas/:aerolineaId')
  async findAerolineaByaeropuertoIdaerolineaId(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
  ) {
    return await this.aeropuertoAerolineaService.findAerolineaByaeropuertoIdaerolineaId(
      aeropuertoId,
      aerolineaId,
    );
  }

  @Get(':aeropuertoId/aerolineas')
  async findAerolineasByAeropuertoId(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aeropuertoAerolineaService.findAerolineasByAeropuertoId(
      aeropuertoId,
    );
  }

  @Put(':aeropuertoId/aerolineas')
  async associateAerolineasAeropuerto(
    @Body() aerolineaDto: AerolineaDto[],
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    const aerolineas = plainToInstance(AerolineaEntity, aerolineaDto);
    return await this.aeropuertoAerolineaService.associateAerolineasAeropuerto(
      aeropuertoId,
      aerolineas,
    );
  }

  @Delete(':aeropuertoId/aerolineas/:aerolineaId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAerolineaAeropuerto(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
  ) {
    return await this.aeropuertoAerolineaService.deleteAerolineaAeropuerto(
      aeropuertoId,
      aerolineaId,
    );
  }
}
