import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DoctorSchedulesService } from '../services/doctor-schedules.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('医生排班')
@Controller('scheduling/schedules')
@UseGuards(JwtAuthGuard)
export class DoctorSchedulesController {
  constructor(private doctorSchedulesService: DoctorSchedulesService) {}

  @Get()
  @ApiOperation({ summary: '获取排班列表' })
  async findAll(
    @Query() query: { doctorId?: string; startDate?: string; endDate?: string; page?: number; limit?: number },
  ) {
    return this.doctorSchedulesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取排班详情' })
  async findOne(@Param('id') id: string) {
    return this.doctorSchedulesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建排班' })
  async create(@Body() dto: any) {
    return this.doctorSchedulesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新排班' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.doctorSchedulesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除排班' })
  async remove(@Param('id') id: string) {
    return this.doctorSchedulesService.remove(id);
  }
}
