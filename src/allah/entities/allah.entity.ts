import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AllahNames {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  meaning: string;

  @Column({ type: 'text' })
  interpretation: string;

  @Column()
  number: number;
}
