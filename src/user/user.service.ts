import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, UserResponse } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(user: UserDto) {
        this.emailExists(user.email);
        await this.userRepository.save(user);
    }

    async emailExists(email: string) {
        const checkEmail = await this.userRepository.findOne({
            where: { email },
        });

        if (checkEmail) {
            throw new BadRequestException('Email ja existente');
        }
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }

    async getAll() {
        const users_response: UserDto[] = [];
        const users = await this.findAll();

        if (!!users.length) {
            for (let user of users) {
                let user_response = plainToInstance(UserResponse, user);
                users_response.push(user_response);
            }
        }

        return users_response;
    }

    async findOneById(id: string) {
        return this.userRepository
            .findOneByOrFail({ id: id })
            .catch(() => {
                throw new NotFoundException('Usuário não encontrado');
            })
            .then((user) => {
                return user;
            });
    }
}
