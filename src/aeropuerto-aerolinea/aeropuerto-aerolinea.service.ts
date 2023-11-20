import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';

@Injectable()
export class AeropuertoAerolineaService {
  constructor(
    @InjectRepository(AeropuertoEntity)
    private readonly aeropuertoRepository: Repository<AeropuertoEntity>,

    @InjectRepository(AerolineaEntity)
    private readonly aerolineaRepository: Repository<AerolineaEntity>,
  ) {}

  async addAerolineaAeropuerto(
    aeropuertoId: number,
    aerolineaId: number,
  ): Promise<AeropuertoEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
        relations: ['aerolineas'],
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La aeropuerto con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    aeropuerto.aerolineas = [
      ...aeropuerto.aerolineas,
      aerolinea,
    ];
    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async findAerolineasByAeropuertoId(
    aeropuertoId: number,
  ): Promise<AerolineaEntity[]> {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
        relations: ['aerolineas'],
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La aeropuerto con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    return aeropuerto.aerolineas;
  }

  async findAerolineaByaeropuertoIdaerolineaId(
    aeropuertoId: number,
    aerolineaId: number,
  ): Promise<AerolineaEntity> {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
        relations: ['aerolineas'],
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronomica con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aeropuertoAerolinea: AerolineaEntity =
      aeropuerto.aerolineas.find((e) => e.id === aerolinea.id);

    if (!aeropuertoAerolinea)
      throw new BusinessLogicException(
        `La cultura gastronomica con id ${aeropuertoId} y el aerolinea con id ${aerolineaId} no están asociados`,
        BusinessError.PRECONDITION_FAILED,
      );

    return aeropuertoAerolinea;
  }

  async associateAerolineasAeropuerto(
    aeropuertoId: number,
    aerolineas: AerolineaEntity[],
  ): Promise<AeropuertoEntity> {
    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
        relations: ['aerolineas'],
      });

    if (!aeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronomica con id ${aeropuertoId} no existe`,
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < aerolineas.length; i++) {
      const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
        where: { id: aerolineas[i].id },
      });
      if (!aerolinea)
        throw new BusinessLogicException(
          `El aerolinea con id ${aerolineas[i].id} no existe`,
          BusinessError.NOT_FOUND,
        );
    }

    aeropuerto.aerolineas = aerolineas;
    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async deleteAerolineaAeropuerto(
    aeropuertoId: number,
    aerolineaId: number,
  ) {
    const aerolinea: AerolineaEntity = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
    });
    if (!aerolinea)
      throw new BusinessLogicException(
        `El aerolinea con id ${aerolineaId} no existe`,
        BusinessError.NOT_FOUND,
      );

    const aeropuerto: AeropuertoEntity =
      await this.aeropuertoRepository.findOne({
        where: { id: aeropuertoId },
        relations: ['aerolineas'],
      });
    if (!aeropuerto)
      throw new BusinessLogicException(
        `La cultura gastronomica con id :id no existe`,
        BusinessError.NOT_FOUND,
      );

    const aeropuertoAerolinea: AerolineaEntity =
      aeropuerto.aerolineas.find((e) => e.id === aerolinea.id);

    if (!aeropuertoAerolinea)
      throw new BusinessLogicException(
        `La cultura gastronomica con id ${aeropuertoId} y el aerolinea con id ${aerolineaId} no están asociados`,
        BusinessError.PRECONDITION_FAILED,
      );

    aeropuerto.aerolineas = aeropuerto.aerolineas.filter(
      (e) => e.id !== aerolineaId,
    );
    await this.aeropuertoRepository.save(aeropuerto);
  }
}
