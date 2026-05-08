import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class SystemSettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    // SystemSettings is a singleton record
    const settings = await this.prisma.systemSettings.findFirst();
    return settings || {};
  }

  async updateSettings(dto: Record<string, any>) {
    const existing = await this.prisma.systemSettings.findFirst();
    if (!existing) {
      return this.prisma.systemSettings.create({ data: dto as any });
    }
    return this.prisma.systemSettings.update({
      where: { id: existing.id },
      data: dto,
    });
  }
}
