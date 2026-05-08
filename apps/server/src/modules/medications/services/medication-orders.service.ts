import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class MedicationOrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    const { patientId, status, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.medicationOrder.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { patient: true, drug: true },
      }),
      this.prisma.medicationOrder.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const order = await this.prisma.medicationOrder.findUnique({
      where: { id },
      include: { patient: true, drug: true },
    });
    if (!order) throw new NotFoundException('医嘱不存在');
    return order;
  }

  async create(dto: any) {
    return this.prisma.medicationOrder.create({
      data: { ...dto, status: 'ACTIVE' },
    });
  }

  async update(id: string, dto: any) {
    const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('医嘱不存在');
    return this.prisma.medicationOrder.update({ where: { id }, data: dto });
  }

  async approve(id: string) {
    const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('医嘱不存在');
    return this.prisma.medicationOrder.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }

  async cancel(id: string) {
    const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('医嘱不存在');
    return this.prisma.medicationOrder.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }
}
