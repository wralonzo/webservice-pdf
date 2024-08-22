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
export class Reservation {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int', { name: 'pet' })
  idPet: number;

  @Column('time')
  horaInicio: Date;

  @Column('time')
  horaFin: Date;

  @Column('date')
  fecha: Date;

  @Column()
  comentario: string;

  @Column()
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Pet, (pet) => pet.reservacionFk, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'pet', referencedColumnName: 'id' }])
  reservacionFk: Pet;
}
