import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
    app.enableCors();

    await app.listen(3000);
}
bootstrap();
