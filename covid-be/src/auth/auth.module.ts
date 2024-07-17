import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
      PassportModule,
      JwtModule.register({
            secret: 'jwtsecretkey',
            signOptions: {
              expiresIn: '1 hour',
            },
      })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
