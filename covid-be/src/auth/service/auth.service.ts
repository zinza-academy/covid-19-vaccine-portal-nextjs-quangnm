import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['ward', 'ward.district', 'ward.district.city'],
        });
        if (user) {
            const match =  bcrypt.compareSync(pass, user.password);
            if (match) {
              return user;
            }
          }
          return null;
    }

    async login(user: UserInterface) {
        const res = { email: user.email, id: user.id, role_id: user.role_id };
        const token = this.jwtService.sign(res);
        const { password, ...userInfo } = user;
        return {
            user: userInfo,
            token,
        };
    }

    logout() {
        return {
            status: '200',
            message: 'Logout successful',
        };
    }
}
