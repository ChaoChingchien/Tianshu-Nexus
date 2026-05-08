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
import { HealthRecordsService } from './health-records.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('健康档案')
@Controller('health-records')
@UseGuards(JwtAuthGuard)
export class HealthRecordsController {
  constructor(private healthRecordsService: HealthRecordsService) {}

  @Get()
  @ApiOperation({ summary: '获取健康档案列表' })
  async findAll(
    @Query() query: { patientId?: string; type?: string; page?: number; limit?: number },
  ) {
    return this.healthRecordsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取健康档案详情' })
  async findOne(@Param('id') id: string) {
    return this.healthRecordsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建健康档案' })
  async create(@Body() dto: any) {
    return this.healthRecordsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新健康档案' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.healthRecordsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除健康档案' })
  async remove(@Param('id') id: string) {
    return this.healthRecordsService.remove(id);
  }
}
