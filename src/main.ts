import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response.interceptor.js';
import { LoggerMiddleware } from './common/logger.middleware.js';
const port = process.env.PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  // app.useGlobalPipes(new LoggerMiddleware());

  await app.listen(port, () => {
    console.log('Server is runnign on port: ' + port);
  });
}
await bootstrap();
