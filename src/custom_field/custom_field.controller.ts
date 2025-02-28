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
import { Request } from 'express';
import { CustomFieldService } from './custom_field.service';
import { CustomFieldDto } from './dto/custom_field.dto';

@Controller('custom-field')
export class CustomFieldController {
    constructor(private readonly customFieldService: CustomFieldService) {}

    @Post()
    async create(
        @Body() custom_field: CustomFieldDto,
        @Req() request: Request,
    ) {
        await this.customFieldService.create(custom_field, request);
    }

    @Get(':cardId')
    async getByCard(@Param('cardId') cardId: string) {
        return await this.customFieldService.findByCardId(cardId);
    }

    @Put('/update/:id')
    async update(
        @Param('id') id: string,
        @Body() custom_field: CustomFieldDto,
    ) {
        return await this.customFieldService.update(id, custom_field);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.customFieldService.delete(id);
    }
}
