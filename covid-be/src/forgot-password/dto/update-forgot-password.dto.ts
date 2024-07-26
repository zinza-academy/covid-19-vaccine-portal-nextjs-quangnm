import { PartialType } from '@nestjs/mapped-types';
import { ForgotPasswordDto } from './create-forgot-password.dto';

export class UpdateForgotPasswordDto extends PartialType(ForgotPasswordDto) {}
