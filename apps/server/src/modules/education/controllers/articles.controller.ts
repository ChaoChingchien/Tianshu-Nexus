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
import { ArticlesService } from '../services/articles.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('健康教育文章')
@Controller('education/articles')
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  async findAll(@Query() query: { search?: string; status?: string; category?: string; page?: number; limit?: number }) {
    return this.articlesService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  async findOne(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() dto: any) {
    return this.articlesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新文章' })
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Post(':id/submit-review')
  @ApiOperation({ summary: '提交审核' })
  async submitForReview(@Param('id') id: string) {
    return this.articlesService.submitForReview(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: '审核通过' })
  async approve(@Param('id') id: string) {
    return this.articlesService.approve(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: '驳回文章' })
  async reject(@Param('id') id: string, @Body() dto: { reason?: string }) {
    return this.articlesService.reject(id, dto);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: '发布文章' })
  async publish(@Param('id') id: string) {
    return this.articlesService.publish(id);
  }
}
