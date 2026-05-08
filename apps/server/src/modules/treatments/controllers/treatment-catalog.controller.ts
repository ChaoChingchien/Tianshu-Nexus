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
import { TreatmentCatalogService } from '../services/treatment-catalog.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('治疗项目目录')
@Controller('treatments/catalog')
@UseGuards(JwtAuthGuard)
export class TreatmentCatalogController {
  constructor(private treatmentCatalogService: TreatmentCatalogService) {}

  @Get()
  @ApiOperation({ summary: '获取治疗项目列表' })
  async findAll(@Query() query: { search?: string; category?: string; page?: number; limit?: number }) {
    return this.treatmentCatalogService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取治疗项目详情' })
  async findOne(@Param('id') id: string) {
    return this.treatmentCatalogService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建治疗项目' })
  async create(@Body() dto: any) {
    return this.treatmentCatalogService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新治疗项目' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.treatmentCatalogService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除治疗项目' })
  async remove(@Param('id') id: string) {
    return this.treatmentCatalogService.remove(id);
  }
}
