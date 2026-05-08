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
import { AcupointsService } from '../services/acupoints.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('穴位管理')
@Controller('treatments/acupoints')
@UseGuards(JwtAuthGuard)
export class AcupointsController {
  constructor(private acupointsService: AcupointsService) {}

  @Get()
  @ApiOperation({ summary: '获取穴位列表' })
  async findAll(@Query() query: { search?: string; meridian?: string; page?: number; limit?: number }) {
    return this.acupointsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取穴位详情' })
  async findOne(@Param('id') id: string) {
    return this.acupointsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建穴位' })
  async create(@Body() dto: any) {
    return this.acupointsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新穴位' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.acupointsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除穴位' })
  async remove(@Param('id') id: string) {
    return this.acupointsService.remove(id);
  }
}
