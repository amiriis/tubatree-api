import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { AllahNames } from 'src/allah/entities/allah.entity';

@Entity()
export class Souls {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  userId: number;
  @ManyToOne(() => Users)
  user: Users;

  @PrimaryColumn()
  allahNameId: number;
  @ManyToOne(() => AllahNames)
  allahName: AllahNames;

  @Column({ nullable: true })
  emamNumber: number;

  @Column({ nullable: true })
  soulNumber: number;

  @Column({ nullable: true })
  movakelKhas: string;

  @Column({ nullable: true })
  movakelAum: string;

  @Column({ nullable: true })
  oun: string;

  @Column({ nullable: true })
  jamaliOrJalali: string;

  @Column({ nullable: true })
  asarAfaghi: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  firstNameAbjad: number;

  @Column({ nullable: true })
  fatherName: string;

  @Column({ nullable: true })
  fatherNameAbjad: number;

  @Column({ nullable: true })
  motherName: string;

  @Column({ nullable: true })
  motherNameAbjad: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;
}
