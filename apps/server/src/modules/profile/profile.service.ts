import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        email: true,
        phone: true,
        department: true,
        hospital: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        doctorProfile: true,
      },
    });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async updateProfile(userId: string, dto: any) {
    const { doctorProfile, ...userData } = dto;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    if (doctorProfile) {
      await this.prisma.doctorProfile.upsert({
        where: { userId },
        create: { userId, ...doctorProfile },
        update: doctorProfile,
      });
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        email: true,
        phone: true,
        department: true,
        hospital: true,
        avatarUrl: true,
        doctorProfile: true,
      },
    });
  }

  async getPortfolio(userId: string) {
    const portfolio = await this.prisma.doctorProfile.findUnique({
      where: { userId },
    });
    return portfolio || {};
  }

  async updatePortfolio(userId: string, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    return this.prisma.doctorProfile.upsert({
      where: { userId },
      create: { userId, ...dto },
      update: dto,
    });
  }

  async changePassword(userId: string, dto: { oldPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');

    const isValid = await bcrypt.compare(dto.oldPassword, user.passwordHash);
    if (!isValid) throw new BadRequestException('当前密码错误');

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash, isFirstLogin: false },
    });

    return { success: true, message: '密码已修改' };
  }
}
