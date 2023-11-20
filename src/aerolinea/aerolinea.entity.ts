import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  // ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class AerolineaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fechaFundacion: string;
  
  @Column()
  paginaWeb: string;

  @ManyToMany(
    () => AeropuertoEntity,
    (aeropuerto) => aeropuerto.aerolineas
  )
  @JoinTable()
  aeropuertos: AeropuertoEntity[];
}
