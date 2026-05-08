import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SystemSettingsService } from './system-settings.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('系统设置')
@Controller('system-settings')
@UseGuards(JwtAuthGuard)
export class SystemSettingsController {
  constructor(private systemSettingsService: SystemSettingsService) {}

  @Get()
  @ApiOperation({ summary: '获取系统设置' })
  async get() {
    return this.systemSettingsService.getSettings();
  }

  @Put()
  @ApiOperation({ summary: '更新系统设置' })
  async update(@Body() dto: Record<string, any>) {
    return this.systemSettingsService.updateSettings(dto);
  }
}
