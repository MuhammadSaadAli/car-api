import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    createUser(email: string, password: string){
        const newUser = this.repo.create({email, password});
        return this.repo.save(newUser);
    }
    findOne(id: number){
        return this.repo.findOne(id)
    }
    find(email: string){
        return this.repo.find({email})
    }
   async update(id: number, attr: Partial<User>){
    const user = await this.findOne(id);
    if(!user){
        throw new Error('User not found')
    }
    }
}