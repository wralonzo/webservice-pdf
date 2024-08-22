import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Pet } from "./pet.entity";
import { ServiceCatalog } from "./service-catalog.entity";
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class ServicePet {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 200 })
  name: string;

  @Column("varchar", { name: "route", length: 50, nullable: true })
  route: string;

  @Column("int", { name: "pet" })
  idPet: number;

  @Column("double", { name: "time" })
  time: number;

  @Column({
    name: "state",
    type: "enum",
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column("int", { name: "user_register" })
  idUserRegister: number;

  @Column("int", { name: "id_service" })
  idService: number;

  @CreateDateColumn({ type: "datetime" })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.serivicePetFk, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "pet", referencedColumnName: "id" }])
  serivicePetFk: Pet;

  @ManyToOne(() => ServiceCatalog, (pet) => pet.productFk, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "id_service", referencedColumnName: "id" }])
  serviceFK: ServiceCatalog;

  @ManyToOne(() => User, (user) => user.serviceRegisterFk, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_register", referencedColumnName: "id" }])
  serviceRegisterFk: User;
}
