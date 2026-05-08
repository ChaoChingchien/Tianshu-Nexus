import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SchedulingStatsService } from '../services/scheduling-stats.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('排班统计')
@Controller('scheduling')
@UseGuards(JwtAuthGuard)
export class SchedulingStatsController {
  constructor(private schedulingStatsService: SchedulingStatsService) {}

  @Get('stats')
  @ApiOperation({ summary: '获取排班统计' })
  async getStats() {
    return this.schedulingStatsService.getStats();
  }
}
