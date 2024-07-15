import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ward } from './ward.entity';
import { City } from './city.entity';

@Entity('district')
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city_id: number;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @ManyToOne(() => City, (city) => city.district, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'city_id' })
  city: City;
}
