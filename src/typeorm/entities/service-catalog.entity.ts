import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServicePet } from './service-pet';
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity({name: 'service'})
export class ServiceCatalog {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @CreateDateColumn({ type: 'datetime' })
  dateCreated: Date;

  @OneToMany(() => ServicePet, (serivicePet) => serivicePet.serviceFK)
  productFk: ServicePet[];
}
