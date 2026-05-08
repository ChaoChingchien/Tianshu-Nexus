import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { category?: string; search?: string; page?: number; limit?: number }) {
    const { category, search, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
        { anonymousId: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { healthRecord: true },
    });
    if (!patient) throw new NotFoundException('患者不存在');
    return patient;
  }

  async create(dto: any) {
    return this.prisma.patient.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('患者不存在');
    return this.prisma.patient.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) throw new NotFoundException('患者不存在');
    return this.prisma.patient.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
