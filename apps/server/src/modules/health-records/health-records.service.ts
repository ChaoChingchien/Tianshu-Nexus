import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class HealthRecordsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; type?: string; page?: number; limit?: number }) {
    const { patientId, type, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.healthRecord.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { patient: true },
      }),
      this.prisma.healthRecord.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const record = await this.prisma.healthRecord.findUnique({
      where: { id },
      include: { patient: true },
    });
    if (!record) throw new NotFoundException('健康档案不存在');
    return record;
  }

  async create(dto: any) {
    return this.prisma.healthRecord.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const record = await this.prisma.healthRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('健康档案不存在');
    return this.prisma.healthRecord.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const record = await this.prisma.healthRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('健康档案不存在');
    return this.prisma.healthRecord.delete({ where: { id } });
  }
}
