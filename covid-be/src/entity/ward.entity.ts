import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { User } from './user.entity';
import { District } from './district.entity';

@Entity("wards")
export class Ward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    district_id: number

    @ManyToOne(() => District, (district) => district.wards, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'district_id'})
    district: District


    @OneToMany(() => User, (user) => user.ward)
    users: User[]
}