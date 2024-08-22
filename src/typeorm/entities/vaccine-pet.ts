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
import { User } from "./user.entity";
import { Vaccine } from "./vaccine.entity";
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypeUser } from "../../shared/enum/type-user.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class VaccinePet {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("int", { name: "pet" })
  idPet: number;

  @Column("int", { name: "vaccine" })
  idVaccine: number;

  @Column("double", { name: "dose" })
  dose: number;

  @Column({ name: "state", length: 10 })
  state: EnumState;

  @Column("int", { name: "user_register" })
  idUserRegister: number;

  @CreateDateColumn({ type: "datetime" })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.vaccinePetFk, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "pet", referencedColumnName: "id" }])
  vaccinePetFk: Pet;

  @ManyToOne(() => Vaccine, (vaccine) => vaccine.vaccineFk, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "vaccine", referencedColumnName: "id" }])
  vaccineFk: Vaccine;

  @ManyToOne(() => User, (user) => user.vaccinePetRegisterFk, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_register", referencedColumnName: "id" }])
  vaccinePetRegisterFk: User;
}
