import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AcupointsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; meridian?: string; page?: number; limit?: number }) {
    const { search, meridian, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (meridian) where.meridian = meridian;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { pinyin: { contains: search } },
        { code: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.acupoint.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.acupoint.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const acupoint = await this.prisma.acupoint.findUnique({ where: { id } });
    if (!acupoint) throw new NotFoundException('穴位不存在');
    return acupoint;
  }

  async create(dto: any) {
    return this.prisma.acupoint.create({ data: dto });
  }

  async update(id: string, dto: any) {
    const acupoint = await this.prisma.acupoint.findUnique({ where: { id } });
    if (!acupoint) throw new NotFoundException('穴位不存在');
    return this.prisma.acupoint.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const acupoint = await this.prisma.acupoint.findUnique({ where: { id } });
    if (!acupoint) throw new NotFoundException('穴位不存在');
    return this.prisma.acupoint.delete({ where: { id } });
  }
}
