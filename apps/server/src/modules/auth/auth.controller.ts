import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() dto: { username: string; password: string }) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('verify-totp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '验证TOTP双因素认证' })
  async verifyTotp(@Body() dto: { userId: string; token: string }) {
    return this.authService.verifyTotp(dto.userId, dto.token);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '患者自助注册' })
  async register(@Body() dto: {
    username: string;
    password: string;
    displayName: string;
    invitationCode: string;
    hospital?: string;
    department?: string;
  }) {
    return this.authService.register(dto);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取当前用户信息' })
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }
}
