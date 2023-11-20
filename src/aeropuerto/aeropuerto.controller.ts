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
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AeropuertoDto } from './aeropuerto.dto';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AeropuertoService } from './aeropuerto.service';

@Controller('aeropuertos')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoController {
  constructor(
    private readonly aeropuertoService: AeropuertoService,
  ) {}

  @Get()
  async findAll() {
    return await this.aeropuertoService.findAll();
  }

  @Get(':aeropuertoId')
  async findOne(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aeropuertoService.findOne(aeropuertoId);
  }

  @Post()
  async create(@Body() aeropuertoDto: AeropuertoDto) {
    const aeropuerto: AeropuertoEntity = plainToInstance(
      AeropuertoEntity,
      aeropuertoDto,
    );
    return await this.aeropuertoService.create(aeropuerto);
  }

  @Put(':aeropuertoId')
  async update(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
    @Body() aeropuertoDto: AeropuertoDto,
  ) {
    const aeropuerto: AeropuertoEntity = plainToInstance(
      AeropuertoEntity,
      aeropuertoDto,
    );
    return await this.aeropuertoService.update(
      aeropuertoId,
      aeropuerto,
    );
  }

  @Delete(':aeropuertoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('aeropuertoId', ParseIntPipe) aeropuertoId: number,
  ) {
    return await this.aeropuertoService.delete(aeropuertoId);
  }
}
