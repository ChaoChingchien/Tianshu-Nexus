import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { QrcodeService } from './qrcode.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('二维码')
@Controller('qrcode')
@UseGuards(JwtAuthGuard)
export class QrcodeController {
  constructor(private qrcodeService: QrcodeService) {}

  @Post('generate')
  @ApiOperation({ summary: '生成二维码' })
  async generate(@Body() dto: { data: string; options?: any }) {
    return this.qrcodeService.generate(dto);
  }

  @Post('decode')
  @ApiOperation({ summary: '解码二维码' })
  async decode(@Body() dto: { image: string }) {
    return this.qrcodeService.decode(dto);
  }
}
