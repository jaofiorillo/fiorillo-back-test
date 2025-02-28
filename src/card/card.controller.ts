import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { CardDto } from './dto/card.dto';
import { CardService } from './card.service';
import { Request } from 'express';

@Controller('cards')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post()
    async create(@Body() card: CardDto, @Req() request: Request) {
        await this.cardService.create(card, request);
    }

    @Get()
    async getAll(@Req() request: Request) {
        return await this.cardService.getAll(request);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() client: CardDto) {
        return await this.cardService.update(id, client);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.cardService.delete(id);
    }

    @Delete('/user/:userId')
    async deleteCardsAndUser(@Param('userId') id: string) {
        return await this.cardService.deleteUserCards(id);
    }
}
