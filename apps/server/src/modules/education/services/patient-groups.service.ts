import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PatientGroupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; page?: number; limit?: number }) {
    const { search, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (search) {
      where.name = { contains: search };
    }

    const [items, total] = await Promise.all([
      this.prisma.patientGroup.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { members: true } } },
      }),
      this.prisma.patientGroup.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const group = await this.prisma.patientGroup.findUnique({
      where: { id },
      include: { members: { include: { patient: true } } },
    });
    if (!group) throw new NotFoundException('分组不存在');
    return group;
  }

  async create(dto: any) {
    return this.prisma.patientGroup.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const group = await this.prisma.patientGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('分组不存在');
    return this.prisma.patientGroup.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const group = await this.prisma.patientGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('分组不存在');
    return this.prisma.patientGroup.delete({ where: { id } });
  }

  async addPatients(id: string, patientIds: string[]) {
    const group = await this.prisma.patientGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('分组不存在');

    return this.prisma.patientGroup.update({
      where: { id },
      data: {
        members: {
          create: patientIds.map((patientId) => ({ patientId })),
        },
      },
      include: { members: { include: { patient: true } } },
    });
  }

  async removePatient(id: string, patientId: string) {
    const group = await this.prisma.patientGroup.findUnique({ where: { id } });
    if (!group) throw new NotFoundException('分组不存在');

    return this.prisma.patientGroup.update({
      where: { id },
      data: {
        members: {
          deleteMany: { patientId },
        },
      },
      include: { members: { include: { patient: true } } },
    });
  }
}
