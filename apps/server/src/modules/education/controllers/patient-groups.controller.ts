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
import { PatientGroupsService } from '../services/patient-groups.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('患者分组')
@Controller('education/patient-groups')
@UseGuards(JwtAuthGuard)
export class PatientGroupsController {
  constructor(private patientGroupsService: PatientGroupsService) {}

  @Get()
  @ApiOperation({ summary: '获取分组列表' })
  async findAll(@Query() query: { search?: string; page?: number; limit?: number }) {
    return this.patientGroupsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取分组详情' })
  async findOne(@Param('id') id: string) {
    return this.patientGroupsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建分组' })
  async create(@Body() dto: any) {
    return this.patientGroupsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分组' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.patientGroupsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分组' })
  async remove(@Param('id') id: string) {
    return this.patientGroupsService.remove(id);
  }

  @Post(':id/patients')
  @ApiOperation({ summary: '添加患者到分组' })
  async addPatients(@Param('id') id: string, @Body() dto: { patientIds: string[] }) {
    return this.patientGroupsService.addPatients(id, dto.patientIds);
  }

  @Delete(':id/patients/:patientId')
  @ApiOperation({ summary: '从分组移除患者' })
  async removePatient(@Param('id') id: string, @Param('patientId') patientId: string) {
    return this.patientGroupsService.removePatient(id, patientId);
  }
}
