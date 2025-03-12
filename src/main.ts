import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // register swagger api
  const config = new DocumentBuilder()
    .setTitle('The Cricket Shop')
    .setDescription('The Cricket Shop API description')
    .setVersion('1.0')
    .addTag('#Cricket shop')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  
  console.log("PORt ",port)
  await app.listen(port ?? 3200);
}
bootstrap();
