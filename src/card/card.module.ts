import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from 'src/card/card.entity';
import { UserEntity } from '../user/user.entity';
import { CustomFieldEntity } from '../custom_field/custom_field.entity';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { UserService } from 'src/user/user.service';
import { CustomFieldService } from 'src/custom_field/custom_field.service';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([CardEntity, UserEntity, CustomFieldEntity]),
    ],
    controllers: [CardController],
    providers: [CardService, UserService, CustomFieldService, AuthService],
    exports: [CardService],
})
export class CardModule {}
