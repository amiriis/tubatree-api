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
  first_name: string;

  @Column({ nullable: true })
  first_name_abjad: number;

  @Column({ nullable: true })
  father_name: string;

  @Column({ nullable: true })
  father_name_abjad: number;

  @Column({ nullable: true })
  mother_name: string;

  @Column({ nullable: true })
  mother_name_abjad: number;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false })
  updated_at: Date;
}
