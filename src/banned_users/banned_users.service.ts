import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { BannedUser } from './banned_users.model';

@Injectable()
export class BannedUsersService {
    constructor(@InjectModel(BannedUser) private bannedUserRepository: typeof BannedUser) {}

    async ban(userID, banReason = null){
        const userExists = await User.findByPk(userID)
        if(!userExists) {
            throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
        }

        const alreadyBanned = await this.bannedUserRepository.findByPk(userID)
        if(alreadyBanned) {
            throw new HttpException('Already Banned', HttpStatus.BAD_REQUEST);
        }

        await this.bannedUserRepository.create({
            user_id: userID,
            ban_reason: banReason
        })

        return 'ok'

    }
}
