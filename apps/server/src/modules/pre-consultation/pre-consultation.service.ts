import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PreConsultationService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; page?: number; limit?: number }) {
    const { patientId, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) {
      where.patientId = patientId;
    }

    const [items, total] = await Promise.all([
      this.prisma.medicalRecord.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.medicalRecord.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const record = await this.prisma.medicalRecord.findUnique({
      where: { id },
    });
    if (!record) throw new NotFoundException('预诊问卷不存在');
    return record;
  }

  async create(dto: any) {
    return this.prisma.medicalRecord.create({
      data: { ...dto },
    });
  }

  async update(id: string, dto: any) {
    const record = await this.prisma.medicalRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('预诊问卷不存在');
    return this.prisma.medicalRecord.update({ where: { id }, data: dto });
  }

  async submitStep(id: string, step: number, dto: any) {
    const record = await this.prisma.medicalRecord.findUnique({ where: { id } });
    if (!record) throw new NotFoundException('预诊问卷不存在');

    const updateData: any = {};
    if (step === 1) updateData.symptoms = JSON.stringify(dto);
    if (step === 2) updateData.medicalHistory = JSON.stringify(dto);
    if (step === 3) {
      updateData.diagnosis = JSON.stringify(dto);
    }

    return this.prisma.medicalRecord.update({
      where: { id },
      data: updateData,
    });
  }
}
