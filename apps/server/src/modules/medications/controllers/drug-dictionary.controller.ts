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
import { DrugDictionaryService } from '../services/drug-dictionary.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('药品字典')
@Controller('medications/drug-dictionary')
@UseGuards(JwtAuthGuard)
export class DrugDictionaryController {
  constructor(private drugDictionaryService: DrugDictionaryService) {}

  @Get()
  @ApiOperation({ summary: '获取药品字典列表' })
  async findAll(@Query() query: { search?: string; category?: string; page?: number; limit?: number }) {
    return this.drugDictionaryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取药品详情' })
  async findOne(@Param('id') id: string) {
    return this.drugDictionaryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建药品' })
  async create(@Body() dto: any) {
    return this.drugDictionaryService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新药品' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.drugDictionaryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除药品' })
  async remove(@Param('id') id: string) {
    return this.drugDictionaryService.remove(id);
  }
}
