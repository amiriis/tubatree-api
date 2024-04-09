import { Souls } from 'src/souls/entities/soul.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, unique: true, nullable: false })
  phoneNumber: string;

  @Column({ length: 6, nullable: true })
  verifyCode: string;

  @Column({ nullable: true })
  verifyCodeExpireAt: Date;

  @OneToMany(() => Souls, (soul) => soul.user)
  souls: Souls[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
