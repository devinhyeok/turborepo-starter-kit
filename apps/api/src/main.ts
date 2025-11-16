import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import type { Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Scalar API 문서 설정
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS 커스텀 API 문서')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // NestJS 파비콘 설정 (전체 애플리케이션)
  app.getHttpAdapter().get('/favicon.ico', (_req: Request, res: Response) => {
    const faviconPath = join(process.cwd(), 'apps', 'api', 'favicon.svg');
    const distFaviconPath = join(__dirname, '..', 'favicon.svg');

    const filePath = existsSync(faviconPath)
      ? faviconPath
      : existsSync(distFaviconPath)
        ? distFaviconPath
        : null;

    if (filePath) {
      const svgContent = readFileSync(filePath, 'utf-8');
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.send(svgContent);
    } else {
      res.status(404).send('Favicon not found');
    }
  });

  // Scalar UI 사용
  app.use(
    '/docs',
    apiReference({
      content: document,
      theme: 'default',
      layout: 'modern',
    }),
  );

  // 루트 경로에서 Scalar 문서로 리다이렉트
  app.getHttpAdapter().get('/', (_req: Request, res: Response) => {
    res.redirect('/docs');
  });

  const port = process.env.PORT ?? 4321;
  await app.listen(port);
  console.log(`🚀 API 서버 실행 중: http://localhost:${port}`);
  console.log(`📚 API 문서: http://localhost:${port}/docs`);
  console.log(`🔗 루트 접속 시 자동으로 문서로 이동합니다`);
}

void bootstrap();
