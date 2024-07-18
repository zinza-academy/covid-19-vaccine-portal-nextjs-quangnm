import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('vaccine_registrations')
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  priority_group: string;

  @Column()
  health_insurance: string;

  @Column()
  user_id: number;

  @Column()
  career: string;

  @Column()
  work_place: string;

  @Column()
  expected_date: Date;

  @Column()
  session: string;

  @ManyToOne(() => User, (user) => user.vaccine_registrations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
