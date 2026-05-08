import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma/prisma.service';
import { generateAnonymousId, generateInvitationCode } from '../../common/utils/anonymize.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    if (user.totpEnabled) {
      return {
        requiresTotp: true,
        userId: user.id,
      };
    }

    return this.generateToken(user);
  }

  async verifyTotp(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.totpSecret) {
      throw new BadRequestException('用户未启用双因素认证');
    }

    const { authenticator } = require('otplib');
    const isValid = authenticator.verify({ token, secret: user.totpSecret });
    if (!isValid) {
      throw new UnauthorizedException('TOTP验证码错误');
    }

    return this.generateToken(user);
  }

  async register(dto: {
    username: string;
    password: string;
    displayName: string;
    invitationCode: string;
    hospital?: string;
    department?: string;
  }) {
    // Verify invitation code
    const code = await this.prisma.invitationCode.findUnique({
      where: { code: dto.invitationCode },
    });
    if (!code || code.isUsed) {
      throw new BadRequestException('邀请码无效或已使用');
    }

    // Check username uniqueness
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('用户名已存在');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        passwordHash,
        displayName: dto.displayName,
        role: 'PATIENT',
        hospital: dto.hospital,
        department: dto.department,
      },
    });

    // Mark invitation code as used
    await this.prisma.invitationCode.update({
      where: { id: code.id },
      data: { isUsed: true, usedBy: user.id, usedAt: new Date() },
    });

    // Create patient profile
    await this.prisma.patient.create({
      data: {
        anonymousId: generateAnonymousId(),
        name: dto.displayName,
        department: dto.department,
      },
    });

    // Create patient user settings
    await this.prisma.patientProfile.create({
      data: { userId: user.id },
    });

    return this.generateToken(user);
  }

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
        totpEnabled: true,
        isFirstLogin: true,
        createdAt: true,
      },
    });
    return user;
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        permissions: user.permissions,
      },
    };
  }
}
