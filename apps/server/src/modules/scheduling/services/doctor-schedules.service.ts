import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class DoctorSchedulesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { doctorId?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) {
    const { doctorId, startDate, endDate, page = 1, limit = 20 } = query;
    const where: any = {};

    if (doctorId) where.doctorId = doctorId;
    if (startDate || endDate) {
      // DoctorSchedule does not have a date field; filter by createdAt instead
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    const [items, total] = await Promise.all([
      this.prisma.doctorSchedule.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { doctor: true },
      }),
      this.prisma.doctorSchedule.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const schedule = await this.prisma.doctorSchedule.findUnique({
      where: { id },
      include: { doctor: true },
    });
    if (!schedule) throw new NotFoundException('排班不存在');
    return schedule;
  }

  async create(dto: any) {
    return this.prisma.doctorSchedule.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const schedule = await this.prisma.doctorSchedule.findUnique({ where: { id } });
    if (!schedule) throw new NotFoundException('排班不存在');
    return this.prisma.doctorSchedule.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const schedule = await this.prisma.doctorSchedule.findUnique({ where: { id } });
    if (!schedule) throw new NotFoundException('排班不存在');
    return this.prisma.doctorSchedule.delete({ where: { id } });
  }
}
