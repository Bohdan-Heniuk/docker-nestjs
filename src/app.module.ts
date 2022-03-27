import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'instagram',
    models: [User],
    autoLoadModels: true
  }),
  ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true,
  })
],
  controllers: [],
  providers: [],
})
export class AppModule {}
