import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();
@Injectable()
export class ForgotPasswordService {
    constructor(
        private jwtService: JwtService,

        private mailerService: MailerService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async forgotPassword(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            const payload = { email: user.email, id: user.id };
            const token = this.jwtService.sign(payload);
            this.userRepository.update(user, {
                ...user,
                reset_pass_token: token,
            });
            const link = `https://your-domain.com/reset-password?${token}`;
            await this.mailerService.sendMail({
                to: 'kinglovee2002@gmail.com',
                from: process.env.MAIL_AUTH_EMAIL,
                subject: 'Password Reset',
                html: `Follow <a href=${link}>here</a> to reset your password`,
            });
            return {
                message: 'Please check your mail',
                token: token
            };
        } else {
            return new UnauthorizedException('Email does not exist', '404');
        }
    }

    async resetPassword(token: string) {
        const newPassword = Math.random().toString(36).slice(-8);
        const userHaveToken = await this.userRepository.findOne({
            where: { reset_pass_token: token },
        });
        if (userHaveToken) {
            try {
                this.jwtService.verify(token);
                const hashNewPassword = bcrypt.hashSync(
                    newPassword,
                    bcrypt.genSaltSync(),
                );
                await this.userRepository.update(userHaveToken, {
                    ...userHaveToken,
                    password: hashNewPassword,
                });
                return {
                    password: newPassword,
                    message: 'Reset password success',
                };
            } catch (error) {
                return error;
            }
        } else {
            return new UnauthorizedException('Token is not exist', '404');
        }
    }
}
