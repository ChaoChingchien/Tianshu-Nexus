import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('审计日志')
@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  @ApiOperation({ summary: '获取审计日志列表（支持筛选）' })
  async findAll(
    @Query() query: {
      userId?: string;
      action?: string;
      resourceType?: string;
      startDate?: string;
      endDate?: string;
      page?: number;
      limit?: number;
    },
  ) {
    return this.auditService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取审计日志详情' })
  async findOne(@Param('id') id: string) {
    return this.auditService.findById(id);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取审计统计概览' })
  async getStats(
    @Query() query: { startDate?: string; endDate?: string },
  ) {
    return this.auditService.getStats(query);
  }
}
