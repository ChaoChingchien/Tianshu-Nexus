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
import { TechniquesService } from '../services/techniques.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('治疗手法')
@Controller('treatments/techniques')
@UseGuards(JwtAuthGuard)
export class TechniquesController {
  constructor(private techniquesService: TechniquesService) {}

  @Get()
  @ApiOperation({ summary: '获取手法列表' })
  async findAll(@Query() query: { search?: string; category?: string; page?: number; limit?: number }) {
    return this.techniquesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取手法详情' })
  async findOne(@Param('id') id: string) {
    return this.techniquesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建手法' })
  async create(@Body() dto: any) {
    return this.techniquesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新手法' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.techniquesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除手法' })
  async remove(@Param('id') id: string) {
    return this.techniquesService.remove(id);
  }
}
