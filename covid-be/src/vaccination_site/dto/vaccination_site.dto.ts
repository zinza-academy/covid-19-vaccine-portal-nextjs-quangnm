import { IsNotEmpty, MaxLength, Min } from 'class-validator';

export class VaccinationSiteDto {
  @IsNotEmpty({ message: 'Name can not be blank' })
  @MaxLength(45)
  name: string;

  @IsNotEmpty({ message: 'Address can not be blank' })
  @MaxLength(45)
  address: string;

  @IsNotEmpty({ message: 'Manager can not be blank' })
  @MaxLength(45)
  manager: string;

  @IsNotEmpty({ message: 'Number Table can not be blank' })
  @Min(1)
  table_number: number;

  @IsNotEmpty({ message: 'Ward_id can not be blank' })
  @Min(1)
  ward_id: number;
}