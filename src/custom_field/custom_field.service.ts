import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomFieldEntity } from './custom_field.entity';
import { Repository } from 'typeorm';
import { CustomFieldDto } from './dto/custom_field.dto';
import { ECustomFieldType } from 'src/enums/custom_field_type.enum';
import { CardEntity } from 'src/card/card.entity';

@Injectable()
export class CustomFieldService {
    constructor(
        @InjectRepository(CustomFieldEntity)
        private readonly customFieldRepository: Repository<CustomFieldEntity>,
    ) {}

    async create(card: CardEntity, custom_fields: CustomFieldDto[]) {
        for (let custom_field of custom_fields) {
            this.validateTypeCustomField(custom_field);
            await this.customFieldRepository.save(custom_field);
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
}
