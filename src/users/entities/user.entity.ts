import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true, nullable: false })
  phone_number: string;

  @Column({ length: 6, nullable: true })
  verify_code: string;

  @Column({ nullable: true })
  verify_code_expire_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
