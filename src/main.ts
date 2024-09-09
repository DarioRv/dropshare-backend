import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({ origin: 'http://localhost:4200' });

  const config = new DocumentBuilder()
    .setTitle('DropShare')
    .setDescription(
      `DropShare es una aplicación web la cual te permite compartir archivos
       fácilmente, con solo ingresar al sitio web podrás subir tu imagen, 
       documento PDF, Word, archivo RAR o cualquier otro para que la
        aplicación te genere un enlace para compartirlo con quien quieras.`,
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'DropShare API Docs',
  });

  await app.listen(3000);
}
bootstrap();
