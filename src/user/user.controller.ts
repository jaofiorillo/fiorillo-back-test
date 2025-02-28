import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Public } from 'src/decorators/decorators';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    async create(@Body() user: UserDto) {
        await this.userService.create(user);
    }

    @Get()
    async getAll() {
        return await this.userService.getAll();
    }
}
