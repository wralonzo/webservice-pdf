import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { Client } from './client.entity';
import { VaccinePet } from './vaccine-pet';
import { ServicePet } from './service-pet';
import { AppUser } from './app-user-entity';
import { RoleUser } from './role-user-entity';
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypeUser } from "../../shared/enum/type-user.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'surname', length: 50 })
  surname: string;

  @Column('varchar', { name: 'mobile', length: 50 })
  mobile: string;

  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @Column('varchar', { name: 'password', length: 200 })
  password: string;

  @Column('varchar', { name: 'user', length: 50 })
  user: string;

  @Column('varchar', { name: 'password_generate', length: 200 })
  passwordGenerate: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column({
    name: 'type_user',
    type: 'enum',
    enum: EnumTypeUser,
    default: EnumTypeUser.ADMIN,
  })
  typeUser: EnumTypeUser;

  @CreateDateColumn({ type: 'datetime',   })
  dateCreated: Date;

  @Column({
    type: 'datetime',
    name: 'last_login',
    nullable: true,
    default: null,
  })
  lastLogin: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Pet, (pet) => pet.petFk)
  petFk: Pet[];

  @OneToMany(() => AppUser, (app) => app.appUserFk)
  appUserFk: AppUser[];

  @OneToMany(() => RoleUser, (role) => role.roleUserFk)
  roleUserFk: RoleUser[];

  @OneToOne(() => Client, (client) => client.clientFk)
  clientFk: Client;

  @OneToMany(() => VaccinePet, (vaccinePet) => vaccinePet.vaccinePetRegisterFk)
  vaccinePetRegisterFk: VaccinePet[];

  @OneToMany(() => ServicePet, (service) => service.serivicePetFk)
  serviceRegisterFk: ServicePet[];
}
