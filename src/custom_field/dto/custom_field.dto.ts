import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ECustomFieldType } from 'src/enums/custom_field_type.enum';

export class CustomFieldDto {
    @IsString()
    @IsNotEmpty({
        message: 'O título do campo customizado é obrigatório',
    })
    title: string;

    @IsString()
    description: string;

    @IsEnum(ECustomFieldType)
    @IsString()
    @IsNotEmpty({
        message: 'O tipo do campo customizado é obrigatório',
    })
    type: ECustomFieldType;

    @IsOptional()
    text: string;

    @IsOptional()
    boolean: boolean;

    @IsOptional()
    list: string[];
}
