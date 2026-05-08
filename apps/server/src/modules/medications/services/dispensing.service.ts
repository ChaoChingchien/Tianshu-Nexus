import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class DispensingService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { orderId?: string; patientId?: string; page?: number; limit?: number }) {
    const { orderId, patientId, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;

    const [items, total] = await Promise.all([
      this.prisma.dispensingRecord.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { drug: true, dispensedBy: true },
      }),
      this.prisma.dispensingRecord.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const record = await this.prisma.dispensingRecord.findUnique({
      where: { id },
      include: { drug: true, dispensedBy: true },
    });
    if (!record) throw new NotFoundException('发药记录不存在');
    return record;
  }

  async dispense(dto: any) {
    return this.prisma.dispensingRecord.create({
      data: { ...dto, status: 'DISPENSED' },
    });
  }

  async confirm(id: string) {
    const record = await this.prisma.dispensingRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('发药记录不存在');
    return this.prisma.dispensingRecord.update({
      where: { id },
      data: { status: 'DISPENSED' },
    });
  }
}
