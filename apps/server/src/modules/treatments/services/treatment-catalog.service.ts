import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class TreatmentCatalogService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; category?: string; page?: number; limit?: number }) {
    const { search, category, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.treatmentItem.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.treatmentItem.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('治疗项目不存在');
    return item;
  }

  async create(dto: any) {
    return this.prisma.treatmentItem.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('治疗项目不存在');
    return this.prisma.treatmentItem.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('治疗项目不存在');
    return this.prisma.treatmentItem.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
