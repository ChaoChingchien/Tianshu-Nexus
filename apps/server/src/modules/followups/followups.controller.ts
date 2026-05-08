import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FollowupsService } from './followups.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('随访管理')
@Controller('followups')
@UseGuards(JwtAuthGuard)
export class FollowupsController {
  constructor(private followupsService: FollowupsService) {}

  @Get()
  @ApiOperation({ summary: '获取随访计划列表' })
  async findAll(@Query() query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    return this.followupsService.findAll(query);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取随访统计' })
  async getStats() {
    return this.followupsService.getStats();
  }

  @Get('today-pending')
  @ApiOperation({ summary: '获取今日待随访列表' })
  async getTodayPending() {
    return this.followupsService.getTodayPending();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取随访计划详情' })
  async findOne(@Param('id') id: string) {
    return this.followupsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建随访计划' })
  async create(@Body() dto: any) {
    return this.followupsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新随访计划' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.followupsService.update(id, dto);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: '执行随访' })
  async execute(@Param('id') id: string, @Body() dto: any) {
    return this.followupsService.execute(id, dto);
  }

  @Get('records')
  @ApiOperation({ summary: '获取随访执行记录列表' })
  async findAllRecords(@Query() query: { planId?: string; patientId?: string; page?: number; limit?: number }) {
    return this.followupsService.findAllRecords(query);
  }
}
