import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', nullable: true })
  price?: number;
}
