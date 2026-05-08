import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class TcmTreatmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; type?: string; page?: number; limit?: number }) {
    const { patientId, type, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (patientId) where.patientId = patientId;
    if (type) where.type = type;

    const [items, total] = await Promise.all([
      this.prisma.tCMTreatment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tCMTreatment.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const treatment = await this.prisma.tCMTreatment.findUnique({
      where: { id },
    });
    if (!treatment) throw new NotFoundException('治疗记录不存在');
    return treatment;
  }

  async create(dto: any) {
    return this.prisma.tCMTreatment.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const treatment = await this.prisma.tCMTreatment.findUnique({ where: { id } });
    if (!treatment) throw new NotFoundException('治疗记录不存在');
    return this.prisma.tCMTreatment.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const treatment = await this.prisma.tCMTreatment.findUnique({ where: { id } });
    if (!treatment) throw new NotFoundException('治疗记录不存在');
    return this.prisma.tCMTreatment.delete({ where: { id } });
  }
}
