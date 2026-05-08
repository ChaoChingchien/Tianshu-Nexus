import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class TechniquesService {
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
      this.prisma.acupunctureTechnique.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.acupunctureTechnique.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const technique = await this.prisma.acupunctureTechnique.findUnique({ where: { id } });
    if (!technique) throw new NotFoundException('手法不存在');
    return technique;
  }

  async create(dto: any) {
    return this.prisma.acupunctureTechnique.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const technique = await this.prisma.acupunctureTechnique.findUnique({ where: { id } });
    if (!technique) throw new NotFoundException('手法不存在');
    return this.prisma.acupunctureTechnique.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const technique = await this.prisma.acupunctureTechnique.findUnique({ where: { id } });
    if (!technique) throw new NotFoundException('手法不存在');
    return this.prisma.acupunctureTechnique.delete({ where: { id } });
  }
}
