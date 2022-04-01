import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize/types';
import { User } from 'src/users/users.model';
import { BannedUsersController } from './banned_users.controller';
import { BannedUser } from './banned_users.model';
import { BannedUsersService } from './banned_users.service';

@Module({
  controllers: [BannedUsersController],
  providers: [BannedUsersService],
  imports: [
    SequelizeModule.forFeature([BannedUser, User]),
  ]}
)
export class BannedUsersModule {}
