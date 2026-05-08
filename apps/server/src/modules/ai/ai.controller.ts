import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('AI模拟接口')
@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('hte/predict')
  @ApiOperation({ summary: 'HTE - 异质性治疗效应预测' })
  async htePredict(@Body() dto: any) {
    return this.aiService.hte(dto);
  }

  @Post('hte')
  @ApiOperation({ summary: 'HTE模拟 - 异质性治疗效应评估' })
  async hte(@Body() dto: any) {
    return this.aiService.hte(dto);
  }

  @Get('risk-assessment/:patientId')
  @ApiOperation({ summary: '风险评估' })
  async riskAssessment(@Param('patientId') patientId: string) {
    return this.aiService.risk({ patientId });
  }

  @Post('risk')
  @ApiOperation({ summary: '风险评估' })
  async risk(@Body() dto: any) {
    return this.aiService.risk(dto);
  }

  @Post('nlp/structurize')
  @ApiOperation({ summary: 'NLP - 自然语言处理' })
  async nlpStructurize(@Body() dto: any) {
    return this.aiService.nlp(dto);
  }

  @Post('nlp')
  @ApiOperation({ summary: 'NLP - 自然语言处理' })
  async nlp(@Body() dto: any) {
    return this.aiService.nlp(dto);
  }

  @Post('ocr/prescription')
  @ApiOperation({ summary: 'OCR - 处方识别' })
  async ocrPrescription(@Body() dto: any) {
    return this.aiService.ocr(dto);
  }

  @Post('ocr')
  @ApiOperation({ summary: 'OCR - 光学字符识别' })
  async ocr(@Body() dto: any) {
    return this.aiService.ocr(dto);
  }
}
