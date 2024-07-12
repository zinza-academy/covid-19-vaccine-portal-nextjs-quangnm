import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: "user"
})
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

  @Column({default: 'nam'})
  gender: string;

  @Column({nullable: true})
  cityId: number;

  @Column({nullable: true})
  districtId: number

  @Column({default: 0})
  wardId: number
}