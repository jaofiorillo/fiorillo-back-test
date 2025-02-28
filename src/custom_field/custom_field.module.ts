import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomFieldEntity } from 'src/custom_field/custom_field.entity';
import { CardEntity } from 'src/card/card.entity';
import { CardService } from 'src/card/card.service';
import { UserModule } from 'src/user/user.module';
import { CardModule } from 'src/card/card.module';
import { AuthService } from 'src/auth/auth.service';
import { CustomFieldController } from './custom_field.controller';
import { CustomFieldService } from './custom_field.service';

@Module({
    imports: [
        UserModule,
        CardModule,
        TypeOrmModule.forFeature([CustomFieldEntity, CardEntity]),
    ],
    controllers: [CustomFieldController],
    providers: [CardService, AuthService, CustomFieldService],
})
export class CustomFieldModule {}
