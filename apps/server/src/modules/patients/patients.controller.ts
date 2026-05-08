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
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('患者管理')
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  @ApiOperation({ summary: '获取患者列表' })
  async findAll(
    @Query() query: { category?: string; search?: string; page?: number; limit?: number },
  ) {
    return this.patientsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取患者详情' })
  async findOne(@Param('id') id: string) {
    return this.patientsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建患者' })
  async create(@Body() dto: any) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新患者' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除患者' })
  async remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
