import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Pet } from "./pet.entity";
import { EnumState } from '../../shared/enum/state.enum';

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "address", length: 100 })
  address: string;

  @Column("int", { name: "user" })
  idUser: number;

  @Column({
    name: "state",
    type: "enum",
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column("int", { name: "user_register", nullable: true })
  idUserRegister: number;

  @CreateDateColumn({ type: "datetime" })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => User, (user) => user.clientFk, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  clientFk: User;

  @OneToMany(() => Pet, (pet) => pet.clientPetFk)
  clientPetFk: Pet[];
}
