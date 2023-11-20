import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AerolineaEntity } from './aerolinea.entity';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    return await this.aerolineaRepository.save(aerolinea);
  }

  async findAll(): Promise<AerolineaEntity[]> {
    return await this.aerolineaRepository.find({
      relations: ['aeropuertos'],
    });
  }

  async findOne(id: number): Promise<AerolineaEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id },
      relations: ['aeropuertos'],
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    return aerolinea;
  }

  async update(id: number, aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
    const persistedAerolinea: AerolineaEntity =
      await this.aerolineaRepository.findOne({
        where: { id },
      });
    if (!persistedAerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    aerolinea.id = id;

    return await this.aerolineaRepository.save(aerolinea);
  }

  async delete(id: number) {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id },
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    await this.aerolineaRepository.remove(aerolinea);
  }
}
