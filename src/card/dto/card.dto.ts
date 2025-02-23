import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ECardStatus } from '../../enums/card_status.enum';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';

export class CardDto {
    @IsString()
    @IsNotEmpty({
        message: 'O título é obrigatório',
    })
    title: string;

    @IsString()
    description: string;

    @IsEnum(ECardStatus)
    @IsString()
    status: ECardStatus;

    @IsString()
    @IsNotEmpty({
        message: 'O usuario é obrigatório',
    })
    userId: string;
}

export class CardResponse {
    id: string;
    title: string;
    description: string;
    status: ECardStatus;
    userId: string;
    @Exclude()
    fk_user: UserEntity;
}
