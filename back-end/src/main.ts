import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const cookieSecret = configService.get<string>('COOKIE_SECRET');

  app.use(cookieParser(cookieSecret));
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
