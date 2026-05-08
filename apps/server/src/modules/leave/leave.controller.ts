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
import { LeaveService } from './leave.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('请假管理')
@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private leaveService: LeaveService) {}

  @Get()
  @ApiOperation({ summary: '获取请假列表' })
  async findAll(
    @Query() query: { userId?: string; status?: string; type?: string; startDate?: string; endDate?: string; page?: number; limit?: number },
  ) {
    return this.leaveService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取请假详情' })
  async findOne(@Param('id') id: string) {
    return this.leaveService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '提交请假申请' })
  async create(@Body() dto: any) {
    return this.leaveService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新请假申请' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.leaveService.update(id, dto);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: '审批通过' })
  async approve(@Param('id') id: string) {
    return this.leaveService.approve(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: '驳回申请' })
  async reject(@Param('id') id: string, @Body() dto: { reason?: string }) {
    return this.leaveService.reject(id, dto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: '取消申请' })
  async cancel(@Param('id') id: string) {
    return this.leaveService.cancel(id);
  }
}
