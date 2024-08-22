import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { App } from './app.entity';
import { EnumState } from '../../shared/enum/state.enum';

@Entity()
export class AppUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int', { name: 'user' })
  idUser: number;

  @Column('int', { name: 'app' })
  idApp: number;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @ManyToOne(() => User, (user) => user.appUserFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user', referencedColumnName: 'id' }])
  appUserFk: User;

  @ManyToOne(() => App, (app) => app.appUserFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'app', referencedColumnName: 'id' }])
  userAppFk: App;
}
