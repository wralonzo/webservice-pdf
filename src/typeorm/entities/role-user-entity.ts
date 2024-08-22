
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { App } from './app.entity';
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class RoleUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int', { name: 'user' })
  idUser: number;

  @Column('int', { name: 'role' })
  idRole: number;


  @Column('int', { name: 'app' })
  idApp: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @ManyToOne(() => User, (user) => user.roleUserFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user', referencedColumnName: 'id' }])
  roleUserFk: User;

  @ManyToOne(() => Role, (role) => role.userRoleFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'role', referencedColumnName: 'id' }])
  userRoleFk: Role;

  @ManyToOne(() => App, (app) => app.appRoleFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'app', referencedColumnName: 'id' }])
  appRoleFk: App;
}
