import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/store')
    async create(@Body() user: UserDto) {
        await this.userService.create(user);
    }

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }
}
