import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('个人中心')
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: '获取当前用户资料' })
  async getProfile(@CurrentUser() user: any) {
    return this.profileService.getProfile(user.id);
  }

  @Put()
  @ApiOperation({ summary: '更新个人资料' })
  async updateProfile(@CurrentUser() user: any, @Body() dto: any) {
    return this.profileService.updateProfile(user.id, dto);
  }

  @Post('change-password')
  @ApiOperation({ summary: '修改密码' })
  async changePassword(@CurrentUser() user: any, @Body() dto: { oldPassword: string; newPassword: string }) {
    return this.profileService.changePassword(user.id, dto);
  }

  @Get('doctor/portfolio')
  @ApiOperation({ summary: '获取医生作品集' })
  async getPortfolio(@CurrentUser() user: any) {
    return this.profileService.getPortfolio(user.id);
  }

  @Put('doctor/portfolio')
  @ApiOperation({ summary: '更新医生作品集' })
  async updatePortfolio(@CurrentUser() user: any, @Body() dto: any) {
    return this.profileService.updatePortfolio(user.id, dto);
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取指定用户资料' })
  async getUserProfile(@Param('userId') userId: string) {
    return this.profileService.getProfile(userId);
  }

  @Get(':userId/portfolio')
  @ApiOperation({ summary: '获取指定医生作品集' })
  async getUserPortfolio(@Param('userId') userId: string) {
    return this.profileService.getPortfolio(userId);
  }
}
