import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { EnumState } from '../../shared/enum/state.enum';

@Entity()
export class Consult {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", length: 200 })
  description: string;

  @Column("int", { name: "pet" })
  pet: number;

  @Column({
    name: "state",
    type: "enum",
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column("int", { name: "user_register" })
  idUserRegister: number;

  @CreateDateColumn({ type: "datetime" })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.consultsFk, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "pet", referencedColumnName: "id" }])
  consultsFk: Pet;
}
