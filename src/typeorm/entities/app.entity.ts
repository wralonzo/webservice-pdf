import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppUser } from './app-user-entity';
import { RoleUser } from './role-user-entity';
import { EnumState } from '../../shared/enum/state.enum';

@Entity()
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'route', length: 50 })
  route: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @DeleteDateColumn()
  deletedAt?: Date;
  
  @OneToMany(() => AppUser, (app) => app.userAppFk)
  appUserFk: AppUser[];

  @OneToMany(() => RoleUser, (roleUser) => roleUser.appRoleFk)
  appRoleFk: RoleUser[];
}
