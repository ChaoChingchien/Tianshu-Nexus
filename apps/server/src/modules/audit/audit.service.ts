import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    userId?: string;
    action?: string;
    resourceType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const { userId, action, resourceType, startDate, endDate, page = 1, limit = 20 } = query;
    const where: any = {};

    if (userId) where.operatorId = userId;
    if (action) where.action = action;
    if (resourceType) where.resourceType = resourceType;
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { operator: { select: { id: true, username: true, displayName: true } } },
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const log = await this.prisma.auditLog.findUnique({
      where: { id },
      include: { operator: { select: { id: true, username: true, displayName: true } } },
    });
    if (!log) throw new NotFoundException('审计日志不存在');
    return log;
  }

  async getStats(query: { startDate?: string; endDate?: string }) {
    const { startDate, endDate } = query;
    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Today range
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [total, today, success, failed] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.count({ where: { createdAt: { gte: todayStart, lte: todayEnd } } }),
      this.prisma.auditLog.count({ where: { ...where, success: true } }),
      this.prisma.auditLog.count({ where: { ...where, success: false } }),
    ]);

    return { total, today, success, failed };
  }
}
