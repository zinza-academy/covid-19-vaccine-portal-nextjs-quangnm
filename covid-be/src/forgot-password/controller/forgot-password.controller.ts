import { Controller, Get, Post, Body, Query, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { ForgotPasswordDto } from '../dto/create-forgot-password.dto';
import { UpdateForgotPasswordDto } from '../dto/update-forgot-password.dto';

@Controller('/forgot-password')
export class ForgotPasswordController {
    constructor(private readonly forgotPasswordService: ForgotPasswordService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.forgotPasswordService.forgotPassword(forgotPasswordDto.email);
    }

    @Get()
    async resetPassword(@Query('token') token: string) {
        return this.forgotPasswordService.resetPassword(token);
    }
}
