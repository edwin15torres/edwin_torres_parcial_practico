import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AeropuertoEntity } from './aeropuerto.entity';

@Injectable()
export class AeropuertoService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
  ) {}

  async create(
    aeropuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity> {
    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async findAll(): Promise<AeropuertoEntity[]> {
    return await this.aeropuertoRepository.find({
      relations: ['aerolineas'],
    });
  }

  async findOne(id: number): Promise<AeropuertoEntity> {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id },
        relations: ['aerolineas'],
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronómica con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    return aeropuerto;
  }

  async update(
    id: number,
    aeropuerto: AeropuertoEntity,
  ): Promise<AeropuertoEntity> {
    const persistedAeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id },
      });
    if (!persistedAeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronómica con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    aeropuerto.id = id;

    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async delete(id: number) {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id },
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronómica con id ${id} no existe`,
        BusinessError.NOT_FOUND,
      );

    await this.aeropuertoRepository.remove(aeropuerto);
  }
}
