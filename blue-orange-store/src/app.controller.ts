import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@ApiTags('Test connection')
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'Connection successful' })
  @ApiOperation({ summary: 'Test connection' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('guard')
  @ApiResponse({ status: 200, description: 'Guard successful' })
  @ApiOperation({ summary: 'Guard test' })
  getGuard(): string {
    return this.appService.testGuard();
  }
}
