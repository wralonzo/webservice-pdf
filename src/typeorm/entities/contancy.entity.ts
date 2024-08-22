import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Constancy {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int', { name: 'pet' })
  idPet: number;

  @Column()
  comentario: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.constancyFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'pet', referencedColumnName: 'id' }])
  constancyFk: Pet;
}
