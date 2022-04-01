import { Body, Controller, Param, Post } from '@nestjs/common';
import { BannedUsersService } from './banned_users.service';
import { BanUserDto } from './dtos/ban-user.dto';

@Controller('banned_users')
export class BannedUsersController {
    constructor(private bannedUsersService: BannedUsersService) {}

    @Post(':id')
    async banUser(@Body() body: BanUserDto, @Param('id') userID: string ) {
        return this.bannedUsersService.ban(userID, body.banReason)
    }
}
