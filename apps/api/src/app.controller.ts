import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('기본')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @ApiOperation({ summary: 'Hello World', description: '기본 API 엔드포인트' })
  @ApiResponse({ status: 200, description: '성공', type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
