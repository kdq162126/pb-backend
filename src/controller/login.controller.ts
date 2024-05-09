import {Controller, Post, Body} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity'
import {Session} from 'express-session';
import * as session from 'express-session';
import { UserEntityRepository } from 'src/dto/user.repositoy';

@Controller('auth')
export class AuthController{

    constructor(
        private readonly userRepository: UserEntityRepository,
    ){}

    @Post('/login')
    async login(@Body() credentials: {username: string, password: string}){

        const {username, password} = credentials;

        const user = await this.userRepository.query('SELECT * FROM users WHERE username = ?', [username],);

        if(user && user.password === password){
            session.user = user;
            return { message : 'Authentication Successful'};
        }else{
            return {message: 'Authentication Failed'};
        }
    }

    @Post('/register')
    async register(@Body() credentials: {username: string, password: string, firstName: string, lastName: string}){
        const {username, password, firstName, lastName} = credentials;

        const user = await this.userRepository.query('SELECT * FROM users WHERE username = ?', [username],);

        if(user){
            return {message: 'User Already Registered'}
        }else if(username.length < 5){
            return {message: 'Username must be longer than 5'}
        }else if(password.length < 6){
            return {messgae: 'Password must be longer than 6'}
        }else{
            const message = "To avoid digital dognappers, please sign this message to confirm you are real " + username;
            const newUser = this.userRepository.create({username, password, firstName, lastName, message});
            await this.userRepository.save(newUser);
            return {message: 'Register Successfully'}
        }
    }

}