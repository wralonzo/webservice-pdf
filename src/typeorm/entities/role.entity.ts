import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleUser } from './role-user-entity';
import { EnumState } from "../../shared/enum/state.enum";
import { EnumTypePet } from "../../shared/enum/type-pet.enum";

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 50 })
  name: string;

  @Column('varchar', { name: 'key', length: 50 })
  key: string;

  @Column({
    name: 'state',
    type: 'enum',
    enum: EnumState,
    default: EnumState.ACTIVE,
  })
  state: EnumState;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => RoleUser, (roleUser) => roleUser.userRoleFk)
  userRoleFk: RoleUser[];
}
