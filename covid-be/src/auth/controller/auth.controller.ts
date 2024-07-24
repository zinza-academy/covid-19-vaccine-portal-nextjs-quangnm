import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './../service/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
        return await this.authService.login(request.user);
    }

    @Get('logout')
    async logout() {
        return this.authService.logout();
    }
}
