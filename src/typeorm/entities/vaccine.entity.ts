import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypeUser } from "../../shared/enum/type-user.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";
import { VaccinePet } from "./vaccine-pet";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", length: 50 })
  description: string;

  @Column({
    name: "expired_date",
  })
  expiredDate: Date;

  @Column({
    name: "state",
    type: "enum",
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @CreateDateColumn({ type: "datetime" })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => VaccinePet, (vaccine) => vaccine.vaccineFk)
  vaccineFk: VaccinePet[];
}
