import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class QrcodeService {
  constructor(private prisma: PrismaService) {}

  async generate(dto: { data: string; options?: any }) {
    if (!dto.data) {
      throw new BadRequestException('请输入要编码的数据');
    }

    // Mock QR code generation - in production would use a QR library
    return {
      success: true,
      data: {
        content: dto.data,
        qrcode: `data:image/png;base64,mock_qr_code_for_${Buffer.from(dto.data).toString('base64')}`,
        format: 'png',
        size: dto.options?.size || 256,
      },
    };
  }

  async decode(dto: { image: string }) {
    if (!dto.image) {
      throw new BadRequestException('请提供二维码图片');
    }

    // Mock QR code decoding
    return {
      success: true,
      data: {
        text: '模拟解码结果: patient-12345',
        format: 'qrcode',
      },
    };
  }
}
