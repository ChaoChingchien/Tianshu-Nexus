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
import { TcmTreatmentsService } from '../services/tcm-treatments.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('中医治疗')
@Controller('treatments/tcm')
@UseGuards(JwtAuthGuard)
export class TcmTreatmentsController {
  constructor(private tcmTreatmentsService: TcmTreatmentsService) {}

  @Get()
  @ApiOperation({ summary: '获取治疗记录列表' })
  async findAll(@Query() query: { patientId?: string; type?: string; page?: number; limit?: number }) {
    return this.tcmTreatmentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取治疗记录详情' })
  async findOne(@Param('id') id: string) {
    return this.tcmTreatmentsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建治疗记录' })
  async create(@Body() dto: any) {
    return this.tcmTreatmentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新治疗记录' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.tcmTreatmentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除治疗记录' })
  async remove(@Param('id') id: string) {
    return this.tcmTreatmentsService.remove(id);
  }
}
