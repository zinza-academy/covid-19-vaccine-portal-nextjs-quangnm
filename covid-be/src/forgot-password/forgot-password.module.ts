import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/entity/user.entity';
import { ForgotPasswordController } from './controller/forgot-password.controller';
import { ForgotPasswordService } from './service/forgot-password.service';


dotenv.config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.MAIL_AUTH_EMAIL,
          pass: process.env.MAIL_AUTH_PASSWORD,
        },
      },
      defaults: {
        from: "'No Reply' <noreply@gmail.com>",
      },
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
      verifyOptions: { ignoreExpiration: false },
    }),
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}