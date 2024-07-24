import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { District } from './district.entity';
import { VaccinationSite } from './vaccination_site.entty';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  district_id: number;

  @ManyToOne(() => District, (district) => district.wards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'district_id' })
  district: District;

  @OneToMany(() => User, (user) => user.ward)
  users: User[];

  @OneToMany(() => VaccinationSite, (vaccination_site) => vaccination_site.ward)
  vaccination_sites: VaccinationSite[];
}
