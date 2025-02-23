import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { CardDto, CardResponse } from './dto/card.dto';
import { UserService } from 'src/user/user.service';
import { ECardStatus } from '../enums/card_status.enum';
import { plainToInstance } from 'class-transformer';
import { ERole } from 'src/enums/role.enum';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        private readonly userService: UserService,
    ) {}

    async create(card: CardDto) {
        const new_card = this.cardRepository.create(card);

        new_card.fk_user = await this.userService.findOneById(card.userId);
        new_card.status = ECardStatus.CRIADO;

        await this.cardRepository.save(new_card);
    }

    async findAll(): Promise<CardEntity[]> {
        return await this.cardRepository.find();
    }

    async getAll(userId: string) {
        const cards_response: CardDto[] = [];
        const query = this.cardRepository
            .createQueryBuilder('card')
            .innerJoinAndSelect('card.fk_user', 'user');

        const user = await this.userService.findOneById(userId);

        if (user.role == ERole.STANDARD_USER) {
            query.where('card.fk_user = :userId', { userId });
        }

        const cards = await query.getMany();

        if (!!cards.length) {
            for (let card of cards) {
                let card_response = plainToInstance(CardResponse, card);
                card_response.userId = card.fk_user.id;
                cards_response.push(card_response);
            }
        }

        return cards_response;
    }
}
