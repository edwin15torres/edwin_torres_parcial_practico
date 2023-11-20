import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repository: Repository<AeropuertoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AeropuertoService,
        {
          provide: getRepositoryToken(AeropuertoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<AeropuertoEntity>>(getRepositoryToken(AeropuertoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an aeropuerto', async () => {
      const aeropuertoDto = {
        nombre: 'NombreAeropuerto',
        codigo: 'ABC123',
        pais: 'PaisAeropuerto',
        ciudad: 'CiudadAeropuerto',
        descripcion: 'Descripción del aeropuerto',
      };

      const aeropuertoEntity = new AeropuertoEntity();
      Object.assign(aeropuertoEntity, aeropuertoDto);

      jest.spyOn(repository, 'save').mockResolvedValue(aeropuertoEntity);

      const result = await service.create(aeropuertoEntity);

      expect(result).toEqual(aeropuertoEntity);
      expect(repository.save).toHaveBeenCalledWith(aeropuertoEntity);
    });
  });



    it('should return aeropuerto if found', async () => {
      const aeropuertoEntity = new AeropuertoEntity();
      jest.spyOn(repository, 'findOne').mockResolvedValue(aeropuertoEntity);

      const result = await service.findOne(1);

      expect(result).toEqual(aeropuertoEntity);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['aerolineas'] });
    });
  });

