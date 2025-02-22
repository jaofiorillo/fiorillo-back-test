import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomFieldEntity } from 'src/custom_field/custom_field.entity';
import { CardEntity } from 'src/card/card.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CustomFieldEntity, CardEntity])],
})
export class CustomFieldModule {}
