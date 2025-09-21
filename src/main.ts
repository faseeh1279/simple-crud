import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 🔹 Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')                     // API title
    .setDescription('API documentation')    // API description
    .setVersion('1.0')                      // Version
    .addBearerAuth()                        // (Optional) Adds JWT auth support
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors(); 

  // 🔹 Swagger UI available at /api
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
