import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Body,
    ParseIntPipe,
    NotFoundException,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../../entity/user.entity';
import { IsNotEmpty, IsEmail, MaxLength, validate } from 'class-validator';
import { RegisterUserDto } from '../dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminRoleGuard } from 'src/custom/roleAdmin.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, AdminRoleGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return user;
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return this.usersService.remove(id);
    }

    @Post()
    async createUser(@Body() createUserDto: RegisterUserDto): Promise<User> {
        const errors = await validate(createUserDto);
        if (errors.length > 0) {
            const errorMessages = errors
                .map((err) => Object.values(err.constraints).join(', '))
                .join(', ');
            throw new BadRequestException(errorMessages);
        }

        const existingUser = await this.usersService.findByCccd(createUserDto.cccd);
        if (existingUser) {
            throw new BadRequestException('CCCD already exists');
        }

        try {
            return await this.usersService.create(createUserDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
    
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: RegisterUserDto,
    ): Promise<User> {
        return this.usersService.update(id, updateUserDto);
    }
}
