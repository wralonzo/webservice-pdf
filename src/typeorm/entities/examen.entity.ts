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
export class Examen {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int', { name: 'pet' })
  idPet: number;

  @Column('varchar', { name: 'motivo', length: 100 })
  motivo: string;

  @Column('varchar', { name: 'diagnostico', length: 100 })
  diagnostico: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.examenFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'pet', referencedColumnName: 'id' }])
  examenFk: Pet;
}
