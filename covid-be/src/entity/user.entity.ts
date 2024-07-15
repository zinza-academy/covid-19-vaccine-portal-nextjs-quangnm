import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Ward } from './ward.entity';

@Entity({  name: "user"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  cccd: string;

  @Column()
  name: string;

  @Column({ default: 'nam' })
  gender: string;

  @Column()
  ward_id: number;

  @ManyToOne(() => Ward, (ward) => ward.users, {
    onDelete: "CASCADE"
  })
  @JoinColumn({name: 'ward_id'})
  ward: Ward
}