import { NotFoundException , Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { RegisterUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.usersRepository.save(registerUserDto);
  }

  async update(id: number, updateUserDto: RegisterUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(user);
  }
}