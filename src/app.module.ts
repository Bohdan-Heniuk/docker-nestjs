import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { ConfigModule } from '@nestjs/config';
import { BannedUsersModule } from './banned_users/banned_users.module';
import { BannedUser } from './banned_users/banned_users.model';
const config = require('../config/config.js');

@Module({
  imports: [
    UsersModule, SequelizeModule.forRoot({
      ...config[process.env.NODE_ENV],
      models: [User, BannedUser],
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    BannedUsersModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
