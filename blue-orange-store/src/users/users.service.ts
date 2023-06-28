import { Injectable,
        NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ){}

    async findAll(limit:number, offset:number) {
        const users = await this.userRepo.find({
            take: limit,
            skip: offset
        });

        if(users.length == 0) {
            throw new NotFoundException('users not found');
        }

        return {
            message: 'users found',
            data: users,
        };
    }

    async findOne(id: string) {
        const userFound = await this.userRepo.findOneBy({ id });

        if(!userFound) {
            throw new NotFoundException('user not found');
        }

        return {
            message: 'user found',
            data: userFound,
        };
    }

    async create(data: CreateUserDTO) {
        const newUser = this.userRepo.create(data);
        console.log("new user in create: ", newUser);

        return {
            message: 'user added',
            data: await this.userRepo.save(newUser),
        };
    }

    async update(id: string, data: UpdateUserDTO) {
        const user = await this.userRepo.findOneBy({ id });

        if(!data.password) {
            delete user.password;
        }
        
        console.log("user in update: ", user);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        this.userRepo.merge(user, data);

        return {
            message: 'user updated',
            data: await this.userRepo.save(user),
        };
    }

    async delete(id: string) {
        const user = await this.userRepo.findOneBy({ id });
        console.log("user in delete: ", user);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            message: 'user deleted',
            data: await this.userRepo.delete(user.id),
        };
    }
}
