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
import { AppointmentsService } from '../services/appointments.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('预约管理')
@Controller('scheduling/appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Get()
  @ApiOperation({ summary: '获取预约列表' })
  async findAll(
    @Query() query: { patientId?: string; doctorId?: string; status?: string; date?: string; page?: number; limit?: number },
  ) {
    return this.appointmentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取预约详情' })
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建预约' })
  async create(@Body() dto: any) {
    return this.appointmentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新预约' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.appointmentsService.update(id, dto);
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: '确认预约' })
  async confirm(@Param('id') id: string) {
    return this.appointmentsService.confirm(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: '取消预约' })
  async cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: '完成就诊' })
  async complete(@Param('id') id: string) {
    return this.appointmentsService.complete(id);
  }
}
