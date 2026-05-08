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
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@tianshu/shared';

@ApiTags('用户管理')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '获取用户列表' })
  async findAll(@Query() query: { role?: string; search?: string }) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '获取用户详情' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '创建用户' })
  async create(@Body() dto: {
    username: string;
    password: string;
    displayName: string;
    role: Role;
    department?: string;
    hospital?: string;
    email?: string;
    phone?: string;
    permissions?: string;
  }) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '更新用户' })
  async update(@Param('id') id: string, @Body() dto: {
    displayName?: string;
    isActive?: boolean;
    department?: string;
    hospital?: string;
    email?: string;
    phone?: string;
    permissions?: string;
  }) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
