import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private UsersService: UsersService) {}

    @Post('/register')
    async registration(@Body() userData: CreateUserDto) {
        return this.UsersService.register(userData)
    }

    @Post('login')
    async login(@Body() userData: LoginUserDto) {
        return this.UsersService.login(userData)
    }
}
