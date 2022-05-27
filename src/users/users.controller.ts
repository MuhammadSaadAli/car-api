import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private userService: UsersService){}
    @Post('/signup')
    createUser( @Body() body: CreateUserDto){
        const {email, password} = body;
        return this.userService.createUser(email, password)
    }
}
