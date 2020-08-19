import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const PORT = 3000;

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle('Books API')
  .setDescription('Book management API')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  logger.log(`Application listening on port:${PORT}`)
}
bootstrap();
