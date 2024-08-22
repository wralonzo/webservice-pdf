
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('double', { name: 'price' })
  price: number;

  @Column('varchar', { name: 'description', length: 50 })
  description: string;

  @Column('double', { name: 'quantity' })
  quantity: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column({ name: 'date_expired', nullable: true })
  dateExpired: Date;

  @CreateDateColumn({ type: 'datetime',   })
  dateCreated: Date;
}
