import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from '../user/user.entity';
import { CustomFieldEntity } from '../custom_field/custom_field.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, UserEntity, CustomFieldEntity]),
    ],
})
export class CardModule {}
