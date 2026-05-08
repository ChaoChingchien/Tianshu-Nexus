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
import { MedicationOrdersService } from '../services/medication-orders.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('药品医嘱')
@Controller('medications/orders')
@UseGuards(JwtAuthGuard)
export class MedicationOrdersController {
  constructor(private medicationOrdersService: MedicationOrdersService) {}

  @Get()
  @ApiOperation({ summary: '获取医嘱列表' })
  async findAll(@Query() query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    return this.medicationOrdersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取医嘱详情' })
  async findOne(@Param('id') id: string) {
    return this.medicationOrdersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建医嘱' })
  async create(@Body() dto: any) {
    return this.medicationOrdersService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新医嘱' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.medicationOrdersService.update(id, dto);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: '审核医嘱' })
  async approve(@Param('id') id: string) {
    return this.medicationOrdersService.approve(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: '取消医嘱' })
  async cancel(@Param('id') id: string) {
    return this.medicationOrdersService.cancel(id);
  }
}
