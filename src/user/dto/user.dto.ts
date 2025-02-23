import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { ERole } from '../../enums/role.enum';
import { Exclude } from 'class-transformer';

export class UserDto {
    @IsString()
    @IsNotEmpty({
        message: 'O nome é obrigatório',
    })
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty({
        message: 'O email é obrigatório',
    })
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'A senha é obrigatório',
    })
    password: string;

    @IsEnum(ERole)
    @IsNotEmpty({
        message: 'O Cargo é obrigatória',
    })
    role: ERole;
}

export class UserResponse {
    id: string;
    name: string;
    email: string;
    role: ERole;
    @Exclude()
    password: string;
}
