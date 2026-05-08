import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class TreatmentPlansService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; status?: string; page?: number; limit?: number }) {
    const { patientId, status, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;
    if (status) where.status = status;

    const [items, total] = await Promise.all([
      this.prisma.treatmentPlan.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { patient: true },
      }),
      this.prisma.treatmentPlan.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const plan = await this.prisma.treatmentPlan.findUnique({
      where: { id },
      include: { patient: true, medicalRecord: true },
    });
    if (!plan) throw new NotFoundException('治疗方案不存在');
    return plan;
  }

  async create(dto: any) {
    return this.prisma.treatmentPlan.create({
      data: { ...dto, status: 'DRAFT' },
    });
  }

  async update(id: string, dto: any) {
    const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('治疗方案不存在');
    return this.prisma.treatmentPlan.update({ where: { id }, data: dto });
  }

  async activate(id: string) {
    const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('治疗方案不存在');
    return this.prisma.treatmentPlan.update({
      where: { id },
      data: { status: 'IN_PROGRESS' },
    });
  }

  async complete(id: string) {
    const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
    if (!plan) throw new NotFoundException('治疗方案不存在');
    return this.prisma.treatmentPlan.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
  }
}
