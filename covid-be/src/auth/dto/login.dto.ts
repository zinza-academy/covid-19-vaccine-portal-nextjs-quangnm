import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email can not be blank' })
  @IsEmail({}, { message: 'It must is email' })
  @MaxLength(45)
  email: string;

  @IsNotEmpty({ message: 'Password can not be blank' })
  @MinLength(8)
  @MaxLength(45)
  password: string;
}