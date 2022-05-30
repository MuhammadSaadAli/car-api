import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
        // If we want to apply custom interceptor on every request so we apply like this
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService){}
    @Post('/signup')
    createUser( @Body() body: CreateUserDto){
        const {email, password} = body;
        return this.authService.signup(email, password)
    }
    // @UseInterceptors(ClassSerializerInterceptor)
    // our custom interceptor
    // @UseInterceptors(new SerializeInterceptor(UserDto))
        // If we want to apply custom interceptor on individual request so we apply like this
    // @Serialize(UserDto)
    @Get('/:id')
    async findOne( @Param('id') id: string){
        const user = await this.userService.findOne(parseInt(id))
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    }

    @Get()
    findAllUser(@Query('email') email:string){
        return this.userService.find(email)
    }
    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.userService.remove(parseInt(id))
    }
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUser){
        return this.userService.update(parseInt(id), body)
    }
}
