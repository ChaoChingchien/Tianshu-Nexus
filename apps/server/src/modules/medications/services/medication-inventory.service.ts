import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class MedicationInventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { drugId?: string; page?: number; limit?: number }) {
    const { drugId, page = 1, limit = 20 } = query;
    const where: any = { isActive: true };

    if (drugId) where.id = drugId;

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
    const item = await this.prisma.drug.findUnique({
      where: { id },
    });
    if (!item) throw new NotFoundException('库存记录不存在');
    return item;
  }

  async update(id: string, dto: { totalStock?: number; minStockWarning?: number }) {
    const item = await this.prisma.drug.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('库存记录不存在');
    return this.prisma.drug.update({ where: { id }, data: dto });
  }
}
