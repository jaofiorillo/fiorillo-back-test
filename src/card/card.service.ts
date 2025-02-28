import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardEntity } from './card.entity';
import { Repository } from 'typeorm';
import { CardDto, CardResponse } from './dto/card.dto';
import { ECardStatus } from '../enums/card_status.enum';
import { plainToInstance } from 'class-transformer';
import { ERole } from 'src/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    async create(card: CardDto, request: Request) {
        const new_card = this.cardRepository.create(card);

        new_card.fk_user = await this.authService.getAuthenticatedUser(request);
        new_card.status = ECardStatus.CRIADO;

        await this.cardRepository.save(new_card);
    }

    async findAll(): Promise<CardEntity[]> {
        return await this.cardRepository.find();
    }

    async getAll(request: Request) {
        const query = this.cardRepository
            .createQueryBuilder('card')
            .innerJoinAndSelect('card.fk_user', 'user');

        const user = await this.authService.getAuthenticatedUser(request);
        const userId = user.id;

        if (user.role == ERole.STANDARD_USER) {
            query.where('card.fk_user = :userId', { userId });
        }

        const cards = await query.getMany();
        const cards_response: CardDto[] = [];

        if (!!cards.length) {
            for (let card of cards) {
                let card_response = plainToInstance(CardResponse, card);
                card_response.userId = card.fk_user.id;
                cards_response.push(card_response);
            }
        }

        return cards_response;
    }

    async findOneById(id: string) {
        return this.cardRepository
            .findOneByOrFail({ id: id })
            .catch(() => {
                throw new NotFoundException('Card não encontrado');
            })
            .then((card) => {
                return card;
            });
    }

    async findCardsByUserId(userId: string) {
        return this.cardRepository
            .find({
                where: {
                    fk_user: {
                        id: userId,
                    },
                },
            })
            .catch(() => {
                throw new NotFoundException('Cards não encontrados');
            })
            .then((card) => {
                return card;
            });
    }

    async deleteUserCards(userId: string) {
        const cards = await this.findCardsByUserId(userId);
        for (let card of cards) {
            await this.delete(card.id);
        }

        this.userService.delete(userId);
    }

    async update(id: string, card: CardDto) {
        try {
            await this.cardRepository.update(id, card);
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id: string) {
        try {
            const card = await this.findOneById(id);
            await this.cardRepository.delete(card.id);

            return { deleted: true };
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
