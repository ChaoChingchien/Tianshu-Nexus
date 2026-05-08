import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DispensingService } from '../services/dispensing.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('药品发药')
@Controller('medications/dispensing')
@UseGuards(JwtAuthGuard)
export class DispensingController {
  constructor(private dispensingService: DispensingService) {}

  @Get()
  @ApiOperation({ summary: '获取发药记录列表' })
  async findAll(@Query() query: { orderId?: string; patientId?: string; page?: number; limit?: number }) {
    return this.dispensingService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取发药记录详情' })
  async findOne(@Param('id') id: string) {
    return this.dispensingService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '发药' })
  async dispense(@Body() dto: any) {
    return this.dispensingService.dispense(dto);
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: '确认发药' })
  async confirm(@Param('id') id: string) {
    return this.dispensingService.confirm(id);
  }
}
