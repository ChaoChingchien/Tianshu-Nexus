import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Role } from '@tianshu/shared';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { role?: string; search?: string }) {
    const where: any = { deletedAt: null };

    if (query.role) {
      where.role = query.role;
    }

    if (query.search) {
      where.OR = [
        { username: { contains: query.search } },
        { displayName: { contains: query.search } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        isActive: true,
        email: true,
        phone: true,
        department: true,
        hospital: true,
        permissions: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        isActive: true,
        email: true,
        phone: true,
        department: true,
        hospital: true,
        permissions: true,
        totpEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async create(dto: {
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
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existing) throw new ConflictException('用户名已存在');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        username: dto.username,
        passwordHash,
        displayName: dto.displayName,
        role: dto.role,
        department: dto.department,
        hospital: dto.hospital,
        email: dto.email,
        phone: dto.phone,
        permissions: dto.permissions,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, dto: {
    displayName?: string;
    isActive?: boolean;
    department?: string;
    hospital?: string;
    email?: string;
    phone?: string;
    permissions?: string;
  }) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        username: true,
        displayName: true,
        role: true,
        isActive: true,
        permissions: true,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');

    // Soft delete
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
