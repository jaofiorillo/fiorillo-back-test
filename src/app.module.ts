import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from 'src/config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from 'src/card/card.module';
import { CustomFieldModule } from 'src/custom_field/custom_field.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CardModule,
        CustomFieldModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
    ],
})
export class AppModule {}
