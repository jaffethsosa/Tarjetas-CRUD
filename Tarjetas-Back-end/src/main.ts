import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'; // Importa fs para escribir el archivo JSON

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Tarjetas')
    .setDescription('Documentación de la API para la gestión de tarjetas')
    .setVersion('1.0')
    .addBearerAuth() // Agrega soporte para autenticación con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Exporta el JSON de Swagger
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2)); // Guarda el archivo con formato legible

  SwaggerModule.setup('api', app, document); // La documentación estará disponible en /api

  await app.listen(3000);
}
bootstrap();
