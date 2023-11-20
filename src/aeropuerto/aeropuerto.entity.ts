/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';

@Entity()
export class AeropuertoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  pais: string;

  @Column()
  ciudad: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => AerolineaEntity, 
  (aerolinea) => aerolinea.aeropuertos)
  aerolineas: AerolineaEntity[];

}
