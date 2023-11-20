import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Injectable()
export class AerolineaAeropuertoService {
  constructor(
    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,

    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,
  ) {}

  async addAeropuertoAerolinea(
    aerolineaId: number,
    aeropuertoId: number,
  ): Promise<AerolineaEntity> {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La aeropuerto con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    aerolinea.aeropuertos = [
      ...aerolinea.aeropuertos,
      aeropuerto,
    ];
    return await this.aerolineaRepository.save(aerolinea);
  }

  async findAeropuertosByAerolineaId(
    aerolineaId: number,
  ): Promise<AeropuertoEntity[]> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    return aerolinea.aeropuertos;
  }

  async findAeropuertoByaerolineaIdaeropuertoId(
    aerolineaId: number,
    aeropuertoId: number,
  ): Promise<AeropuertoEntity> {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La aeropuerto con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aerolineaAeropuerto: AeropuertoEntity =
      aerolinea.aeropuertos.find(
        (e) => e.id === aeropuerto.id,
      );

    if (!aerolineaAeropuerto)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} y el aeropuerto con id ${aeropuertoId} no están asociados`,
        BusinessError.PRECONDITION_FAILED,
      );

    return aerolineaAeropuerto;
  }

  async associateAeropuertosAerolinea(
    aerolineaId: number,
    aeropuertos: AeropuertoEntity[],
  ): Promise<AerolineaEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });

    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < aeropuertos.length; i++) {
      const aeropuerto: AeropuertoEntity =
        await this.aeropuertoRepository.findOne({
          where: { id: aeropuertos[i].id },
        });
      if (!aeropuerto)
        throw new BusinessLogicException(
          `La aeropuerto con id ${aeropuertos[i].id} no existe`,
          BusinessError.NOT_FOUND,
        );
    }

    aerolinea.aeropuertos = aeropuertos;

    return await this.aerolineaRepository.save(aerolinea);
  }

  async deleteAeropuertoAerolinea(
    aerolineaId: number,
    aeropuertoId: number,
  ) {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La aeropuerto con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['aeropuertos'],
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aerolineaAeropuerto: AeropuertoEntity =
      aerolinea.aeropuertos.find(
        (e) => e.id === aeropuerto.id,
      );

    if (!aerolineaAeropuerto)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} y el aeropuerto con id ${aeropuertoId} no están asociados`,
        BusinessError.PRECONDITION_FAILED,
      );

    aerolinea.aeropuertos = aerolinea.aeropuertos.filter(
      (e) => e.id !== aeropuertoId,
    );
    await this.aerolineaRepository.save(aerolinea);
  }
}
