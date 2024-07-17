import {
    IsNotEmpty,
    IsEmail,
    MaxLength,
    MinLength,
    IsDate,
    IsEnum,
    IsNumber,
    Min,
    IsString,
    IsOptional,
    Matches
} from 'class-validator';
import { CheckLength } from './check-length.dto';
import { Type } from 'class-transformer';

enum GenderType {
    MALE = 'nam',
    FEMALE = 'nữ',
}

export class RegisterUserDto {
    @IsNotEmpty({ message: 'Identity Card can not be blank' })
    @CheckLength({ message: 'Identity Card Number must equal 9 or equal 12' })
    @IsString({ message: 'Identity Card must be a string' })
    @Matches(/^[0-9]+$/, { message: 'Identity Card must contain only numbers' })
    cccd: string;

    @IsNotEmpty({ message: 'Email can not be blank' })
    @IsEmail({}, { message: 'Invalid email format' })
    @MaxLength(45, { message: 'Email must be at most 45 characters long' })
    email: string;

    @IsNotEmpty({ message: 'Password can not be blank' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(10, { message: 'Password must be at most 10 characters long' })
    password: string;

    @IsNotEmpty({ message: 'Username can not be blank' })
    @MaxLength(45, { message: 'Username must be at most 45 characters long' })
    name: string;

    @Type(() => Date)
    @IsDate({ message: 'dob must be of type mm/dd/yyyy' })
    @IsNotEmpty({ message: 'Birthday cannot be left blank' })
    dob: Date;

    @IsNotEmpty({ message: 'Gender can not be blank' })
    @IsEnum(GenderType, { message: 'Gender must be either "nam" or "nữ"' })
    gender: GenderType;

    @IsNotEmpty({ message: 'Ward Id can not be blank' })
    @IsNumber({}, { message: 'Ward Id must be a number' })
    @Min(1, { message: 'Ward Id must be at least 1' })
    wardId: number;

    @IsOptional()
    @IsNumber({}, { message: 'City Id must be a number' })
    cityId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'District Id must be a number' })
    districtId?: number;
}
