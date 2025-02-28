import {
    IsNotEmpty,
    IsString,
    IsEnum,
    ValidateNested,
    IsOptional,
    IsArray,
} from 'class-validator';
import { ECardStatus } from '../../enums/card_status.enum';
import { Exclude, Type } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';
import { CustomFieldDto } from 'src/custom_field/dto/custom_field.dto';

export class CardDto {
    @IsString()
    @IsNotEmpty({
        message: 'O título é obrigatório',
    })
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(ECardStatus)
    @IsString()
    status: ECardStatus;
}

export class CardResponse {
    id: string;
    title: string;
    description: string;
    status: ECardStatus;
    userId: string;
    @Exclude()
    custom_fieldsd: CustomFieldDto[];
    @Exclude()
    fk_user: UserEntity;
}
