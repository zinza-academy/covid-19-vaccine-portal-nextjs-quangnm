import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ward } from './ward.entity';

@Entity('vaccination_sites')
export class VaccinationSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  ward_id: number;

  @Column()
  manager: string;

  @Column()
  table_number: number;

  @ManyToOne(() => Ward, (ward) => ward.vaccination_sites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;
}
