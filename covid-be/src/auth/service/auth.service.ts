import { UsersService } from './../../users/services/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '../interface/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,

    private usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['ward', 'ward.district', 'ward.district.city', 'role'],
    });
    if (user) {
      const match = bcrypt.compareSync(pass, user.password);
      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    if (user.password !== foundUser.password) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      role_id: foundUser.role_id,
    };

    const access_token = this.jwtService.sign(payload);
    const { password, ...userInfo } = user;

    return {
      user: userInfo,
      access_token,
    };
  }

  logout() {
    return {
      status: '200',
      message: 'Logout successful',
    };
  }
}
