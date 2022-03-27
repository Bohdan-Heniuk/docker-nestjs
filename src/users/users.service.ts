import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { ILogin } from './user.types';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async register(userData: CreateUserDto): Promise<User> {
        const {username, email, password} = userData

        this.validateUser(userData)

        const userExists = await this.userRepository.findOne( {where: {email}})

        if(userExists) {
            throw new HttpException('User with such email or username exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 5)
        const createdUser = await this.userRepository.create({username, password: hashedPassword, email})

        return createdUser
    }

    async login(userData: LoginUserDto): Promise<ILogin> {
        const {email, password} = userData
        const user = await this.userRepository.findOne({where: {email}})
        
        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if(!user || !isPasswordEquals) {
            throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
        }

        return this.generateToken(user.toJSON())   
    }

    private generateToken(userData) {
        return {token: jwt.sign(userData, process.env.SECRET, {expiresIn: 604800})}
    }

    private validateUser(userData: CreateUserDto) {
        const {username, password, email} = userData
        const emailSymbols = ['@', '.']
        if(!username || !email || !password) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }

        if(username.length < 5 || username.length > 15) {
            throw new HttpException('Username length should be from 5 to 15 symbols', HttpStatus.BAD_REQUEST)
        }

        emailSymbols.forEach(symbol => {
            if(email.indexOf(symbol) === -1) {
                throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST)
            }
        })

        if(password.length < 5 || password.length > 15) {
            throw new HttpException('Password length should be from 5 to 15 symbols', HttpStatus.BAD_REQUEST)
        }
    } 
}
