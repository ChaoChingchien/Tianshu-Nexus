import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class DrugDictionaryService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; category?: string; page?: number; limit?: number }) {
    const { search, category, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { genericName: { contains: search } },
        { drugCode: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.drug.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.drug.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const drug = await this.prisma.drug.findUnique({ where: { id } });
    if (!drug) throw new NotFoundException('药品不存在');
    return drug;
  }

  async create(dto: any) {
    return this.prisma.drug.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const drug = await this.prisma.drug.findUnique({ where: { id } });
    if (!drug) throw new NotFoundException('药品不存在');
    return this.prisma.drug.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const drug = await this.prisma.drug.findUnique({ where: { id } });
    if (!drug) throw new NotFoundException('药品不存在');
    return this.prisma.drug.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
