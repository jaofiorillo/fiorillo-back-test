import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { CardDto, CardResponse } from './dto/card.dto';
import { UserService } from 'src/user/user.service';
import { ECardStatus } from '../enums/card_status.enum';
import { plainToInstance } from 'class-transformer';
import { ERole } from 'src/enums/role.enum';
import { CustomFieldService } from 'src/custom_field/custom_field.service';
import { CustomFieldDto } from 'src/custom_field/dto/custom_field.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        private readonly userService: UserService,
        private readonly customFieldService: CustomFieldService,
        private readonly authService: AuthService,
    ) {}

    async create(card: CardDto, request: Request) {
        const new_card = await this.cardRepository.create(card);

        new_card.fk_user = await this.authService.getAuthUser(request);
        new_card.status = ECardStatus.CRIADO;

        const save_card = await this.cardRepository.save(new_card);

        if (card.custom_fields.length > 0) {
            await this.customFieldService.create(save_card, card.custom_fields);
        }
    }

    async findAll(): Promise<CardEntity[]> {
        return await this.cardRepository.find();
    }

    async getAll(request: Request) {
        const cards_response: CardDto[] = [];
        const query = this.cardRepository
            .createQueryBuilder('card')
            .innerJoinAndSelect('card.fk_user', 'user')
            .innerJoinAndSelect('card.custom_fields', 'custom_field');

        const user = await this.authService.getAuthUser(request);
        const userId = user.id;

        if (user.role == ERole.STANDARD_USER) {
            query.where('card.fk_user = :userId', { userId });
        }

        const cards = await query.getMany();

        if (!!cards.length) {
            for (let card of cards) {
                let card_response = plainToInstance(CardResponse, card);
                card_response.userId = card.fk_user.id;
                card_response.custom_fields = plainToInstance(
                    CustomFieldDto,
                    card.custom_fields,
                );
                cards_response.push(card_response);
            }
        }

        return cards_response;
    }

    async update(id: string, card: CardDto) {
        try {
            await this.cardRepository.update(id, card);
        } catch (error) {
            throw new Error(error);
        }
    }
}
