import { Souls } from 'src/souls/entities/soul.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class AllahNames {
  @PrimaryColumn({ select: false })
  id: number;

  @Column()
  name: string;

  @Column()
  meaning: string;

  @Column({ type: 'text' })
  interpretation: string;

  @Column({ select: false })
  number: number;

  @OneToMany(() => Souls, (soul) => soul.allahName)
  souls: Souls[];
}
