import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class FollowupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    const { patientId, status, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.followUp.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { patient: true, doctor: true },
      }),
      this.prisma.followUp.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const plan = await this.prisma.followUp.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
    if (!plan) throw new NotFoundException('随访计划不存在');
    return plan;
  }

  async create(dto: any) {
    return this.prisma.followUp.create({
      data: { ...dto, status: 'PENDING' },
    });
  }

  async update(id: string, dto: any) {
    const plan = await this.prisma.followUp.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('随访计划不存在');
    return this.prisma.followUp.update({ where: { id }, data: dto });
  }

  async execute(id: string, dto: any) {
    const plan = await this.prisma.followUp.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('随访计划不存在');

    return this.prisma.followUp.update({
      where: { id },
      data: {
        ...dto,
        status: 'COMPLETED',
      },
    });
  }

  async findAllRecords(query: { planId?: string; patientId?: string; page?: number; limit?: number }) {
    const { planId, patientId, page = 1, limit = 20 } = query;
    const where: any = {};

    if (planId) where.id = planId;
    if (patientId) where.patientId = patientId;

    const [items, total] = await Promise.all([
      this.prisma.followUp.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { plannedDate: 'desc' },
        include: { patient: true, doctor: true },
      }),
      this.prisma.followUp.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async getStats() {
    const [pending, completed, missed] = await Promise.all([
      this.prisma.followUp.count({ where: { status: 'PENDING' } }),
      this.prisma.followUp.count({ where: { status: 'COMPLETED' } }),
      this.prisma.followUp.count({ where: { status: 'MISSED' } }),
    ]);

    return { pending, completed, missed };
  }

  async getTodayPending() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    return this.prisma.followUp.findMany({
      where: {
        status: 'PENDING',
        plannedDate: { gte: todayStart, lte: todayEnd },
      },
      include: { patient: true, doctor: true },
      orderBy: { plannedDate: 'asc' },
    });
  }
}
