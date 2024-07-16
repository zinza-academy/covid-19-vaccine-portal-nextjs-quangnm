import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ward } from './ward.entity';
import { Registration } from './vaccination_registration.entity';
import { Role } from './role.entity';

@Entity({ name: 'user' })
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

  @Column()
  role_id: number;

  @ManyToOne(() => Ward, (ward) => ward.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @OneToMany(() => Registration, (registration) => registration.user)
  vaccine_registrations: Registration[];

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
