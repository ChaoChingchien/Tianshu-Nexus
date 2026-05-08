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
import { TreatmentPlansService } from '../services/treatment-plans.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('治疗方案')
@Controller('treatments/plans')
@UseGuards(JwtAuthGuard)
export class TreatmentPlansController {
  constructor(private treatmentPlansService: TreatmentPlansService) {}

  @Get()
  @ApiOperation({ summary: '获取治疗方案列表' })
  async findAll(@Query() query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    return this.treatmentPlansService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取治疗方案详情' })
  async findOne(@Param('id') id: string) {
    return this.treatmentPlansService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建治疗方案' })
  async create(@Body() dto: any) {
    return this.treatmentPlansService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新治疗方案' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.treatmentPlansService.update(id, dto);
  }

  @Post(':id/activate')
  @ApiOperation({ summary: '激活治疗方案' })
  async activate(@Param('id') id: string) {
    return this.treatmentPlansService.activate(id);
  }

  @Post(':id/complete')
  @ApiOperation({ summary: '完成治疗方案' })
  async complete(@Param('id') id: string) {
    return this.treatmentPlansService.complete(id);
  }
}
