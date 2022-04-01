import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BannedUser } from 'src/banned_users/banned_users.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
