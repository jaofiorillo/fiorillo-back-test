import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post('/store')
    async create(@Body() card: CardDto) {
        await this.cardService.create(card);
    }

    @Get(':userId')
    async getAll(@Param('userId') userId: string) {
        return await this.cardService.getAll(userId);
    }
}
