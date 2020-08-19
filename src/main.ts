import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const PORT = 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);

  logger.log(`Application listening on port:${PORT}`)
}
bootstrap();
