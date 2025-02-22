import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CardEntity } from 'src/card/card.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, CardEntity])],
})
export class UserModule {}
