import { Injectable, NotFoundException } from '@nestjs/common';
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
        throw new NotFoundException('User not found')
    }
    Object.assign(user, attr);
    return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('User Not Found')
        }
        return this.repo.remove(user)
    }
}
