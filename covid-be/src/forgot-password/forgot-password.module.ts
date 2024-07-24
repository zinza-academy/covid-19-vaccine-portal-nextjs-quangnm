import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './service/forgot-password.service';
import { ForgotPasswordController } from './controller/forgot-password.controller';

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
