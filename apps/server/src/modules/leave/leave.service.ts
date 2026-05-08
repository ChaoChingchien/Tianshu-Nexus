import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { userId?: string; status?: string; type?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) {
    const { userId, status, type, startDate, endDate, page = 1, limit = 20 } = query;
    const where: any = {};

    if (userId) where.patientId = userId;
    if (status) where.status = status;
    if (type) where.leaveType = type;

    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) where.startTime.gte = new Date(startDate);
      if (endDate) where.startTime.lte = new Date(endDate);
    }

    const [items, total] = await Promise.all([
      this.prisma.leaveRequest.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { patient: true, approvedBy: true },
      }),
      this.prisma.leaveRequest.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const leave = await this.prisma.leaveRequest.findUnique({
      where: { id },
      include: { patient: true, approvedBy: true },
    });
    if (!leave) throw new NotFoundException('请假申请不存在');
    return leave;
  }

  async create(dto: any) {
    return this.prisma.leaveRequest.create({
      data: { ...dto, status: 'PENDING_APPROVAL' },
    });
  }

  async update(id: string, dto: any) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new NotFoundException('请假申请不存在');
    return this.prisma.leaveRequest.update({ where: { id }, data: dto });
  }

  async approve(id: string) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new NotFoundException('请假申请不存在');
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'APPROVED', approvedAt: new Date() },
    });
  }

  async reject(id: string, dto: { reason?: string }) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new NotFoundException('请假申请不存在');
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }

  async cancel(id: string) {
    const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
    if (!leave) throw new NotFoundException('请假申请不存在');
    return this.prisma.leaveRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }
}
