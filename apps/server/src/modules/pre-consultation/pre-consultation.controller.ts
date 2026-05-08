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
import { PreConsultationService } from './pre-consultation.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('预诊咨询')
@Controller('pre-consultation')
@UseGuards(JwtAuthGuard)
export class PreConsultationController {
  constructor(private preConsultationService: PreConsultationService) {}

  @Get()
  @ApiOperation({ summary: '获取预诊问卷列表' })
  async findAll(@Query() query: { patientId?: string; page?: number; limit?: number }) {
    return this.preConsultationService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取预诊问卷详情' })
  async findOne(@Param('id') id: string) {
    return this.preConsultationService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建预诊问卷' })
  async create(@Body() dto: any) {
    return this.preConsultationService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新预诊问卷' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.preConsultationService.update(id, dto);
  }

  @Post(':id/submit-step1')
  @ApiOperation({ summary: '提交第一步：基本信息' })
  async submitStep1(@Param('id') id: string, @Body() dto: any) {
    return this.preConsultationService.submitStep(id, 1, dto);
  }

  @Post(':id/submit-step2')
  @ApiOperation({ summary: '提交第二步：症状信息' })
  async submitStep2(@Param('id') id: string, @Body() dto: any) {
    return this.preConsultationService.submitStep(id, 2, dto);
  }

  @Post(':id/submit-step3')
  @ApiOperation({ summary: '提交第三步：完成并提交' })
  async submitStep3(@Param('id') id: string, @Body() dto: any) {
    return this.preConsultationService.submitStep(id, 3, dto);
  }
}
