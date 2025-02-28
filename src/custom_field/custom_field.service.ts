import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomFieldEntity } from './custom_field.entity';
import { Repository } from 'typeorm';
import { CustomFieldDto } from './dto/custom_field.dto';
import { ECustomFieldType } from 'src/enums/custom_field_type.enum';
import { Request } from 'express';
import { CardService } from 'src/card/card.service';
import { AuthService } from 'src/auth/auth.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomFieldService {
    constructor(
        @InjectRepository(CustomFieldEntity)
        private readonly customFieldRepository: Repository<CustomFieldEntity>,
        private readonly cardService: CardService,
        private readonly authService: AuthService,
    ) {}

    async create(custom_field: CustomFieldDto, request: Request) {
        const user = await this.authService.getAuthUser(request);
        const cards = await this.cardService.findCardsByUserId(user.id);

        for (let card of cards) {
            const save_field =
                await this.customFieldRepository.create(custom_field);
            save_field.fk_card = card;
            await this.customFieldRepository.save(save_field);
        }
    }

    validateTypeCustomField(custom_field: CustomFieldDto) {
        const isInvalid =
            (custom_field.type === ECustomFieldType.BOOLEAN &&
                custom_field.boolean === null) ||
            (custom_field.type === ECustomFieldType.LIST &&
                (!custom_field.list || custom_field.list.length <= 0)) ||
            (custom_field.type === ECustomFieldType.TEXT &&
                custom_field.text === null);

        if (isInvalid) {
            throw new BadRequestException('Erro no tipo do custo field');
        }
    }

    async update(id: string, custom_field: CustomFieldDto) {
        try {
            await this.customFieldRepository.update(id, custom_field);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findAll(): Promise<CustomFieldEntity[]> {
        return await this.customFieldRepository.find();
    }

    async findByCardId(cardId: string) {
        const fields = await this.customFieldRepository.find({
            where: {
                fk_card: { id: cardId },
            },
        });

        const fields_response: CustomFieldDto[] = [];

        if (!!fields.length) {
            for (let field of fields) {
                let field_response = plainToInstance(CustomFieldDto, field);
                fields_response.push(field_response);
            }
        }

        return fields_response;
    }
}
