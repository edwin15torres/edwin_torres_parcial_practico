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
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { AerolineaAeropuertoService } from './aerolinea-aeropuerto.service';
import { AeropuertoDto } from 'src/aeropuerto/aeropuerto.dto';
import { plainToInstance } from 'class-transformer';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';

@Controller('aerolineas')
@UseInterceptors(BusinessErrorsInterceptor)
export class AerolineaAeropuertoController {
  constructor(
    private readonly aerolineaAeropuertoService: AerolineaAeropuertoService,
  ) {}

  @Post(':aerolineaId/aeropuertos/:aeropuertoId')
  async addAeropuertoAerolinea(
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aerolineaAeropuertoService.addAeropuertoAerolinea(
      aerolineaId,
      aeropuertoId,
    );
  }

  @Get(':aerolineaId/aeropuertos/:aeropuertoId')
  async findAeropuertoByaerolineaIdaeropuertoId(
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aerolineaAeropuertoService.findAeropuertoByaerolineaIdaeropuertoId(
      aerolineaId,
      aeropuertoId,
    );
  }

  @Get(':aerolineaId/aeropuertos')
  async findAeropuertosByAerolineaId(
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
  ) {
    return await this.aerolineaAeropuertoService.findAeropuertosByAerolineaId(
      aerolineaId,
    );
  }

  @Put(':aerolineaId/aeropuertos')
  async associateAeropuertosAerolinea(
    @Body() aeropuertoDto: AeropuertoDto[],
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
  ) {
    const aeropuertos = plainToInstance(
      AeropuertoEntity,
      aeropuertoDto,
    );
    return await this.aerolineaAeropuertoService.associateAeropuertosAerolinea(
      aerolineaId,
      aeropuertos,
    );
  }

  @Delete(':aerolineaId/aeropuertos/:aeropuertoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAeropuertoAerolinea(
    @Param('aerolineaId', ParseIntPipe) aerolineaId: number,
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aerolineaAeropuertoService.deleteAeropuertoAerolinea(
      aerolineaId,
      aeropuertoId,
    );
  }
}
