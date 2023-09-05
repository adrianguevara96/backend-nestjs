import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key/api-key.guard';
import { Public } from './auth/decorators/public.decorator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtGuard } from './auth/guards/jwt/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/guards/roles/roles.guard';
import { Role } from './auth/models/role.model';
import { Roles } from './auth/decorators/role.decorator';

@ApiTags('Test connection')
@UseGuards(ApiKeyGuard, JwtGuard, RolesGuard)
// @UseGuards(JwtGuard)
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

  @Public()
  @UseGuards(AuthGuard('jwt'))
  @Get('jwt')
  @ApiResponse({ status: 200, description: 'JWT decode successful' })
  @ApiOperation({ summary: 'JWT test' })
  getJWTGuard(): string {
    return this.appService.testJWTGuard();
  }

  @Get('role')
  @Roles(Role.USER)
  @ApiResponse({ status: 200, description: 'Role successful' })
  @ApiOperation({ summary: 'Role test' })
  getRoleTest(): string {
    return this.appService.testRole();
  }
}
