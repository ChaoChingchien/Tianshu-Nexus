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
import { MedicationInventoryService } from '../services/medication-inventory.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('药品库存')
@Controller('medications/inventory')
@UseGuards(JwtAuthGuard)
export class MedicationInventoryController {
  constructor(private medicationInventoryService: MedicationInventoryService) {}

  @Get()
  @ApiOperation({ summary: '获取库存列表' })
  async findAll(@Query() query: { drugId?: string; batchNo?: string; page?: number; limit?: number }) {
    return this.medicationInventoryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取库存详情' })
  async findOne(@Param('id') id: string) {
    return this.medicationInventoryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '入库' })
  async create(@Body() dto: any) {
    return this.medicationInventoryService.update(dto.drugId || dto.id, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新库存记录' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.medicationInventoryService.update(id, dto);
  }
}
