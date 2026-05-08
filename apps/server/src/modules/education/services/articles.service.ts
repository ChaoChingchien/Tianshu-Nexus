import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; status?: string; category?: string; page?: number; limit?: number }) {
    const { search, status, category, page = 1, limit = 20 } = query;
    const where: any = { deletedAt: null };

    if (status) where.status = status;
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.educationArticle.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { createdBy: true },
      }),
      this.prisma.educationArticle.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  async findById(id: string) {
    const article = await this.prisma.educationArticle.findUnique({
      where: { id },
      include: { createdBy: true },
    });
    if (!article) throw new NotFoundException('文章不存在');
    return article;
  }

  async create(dto: any) {
    return this.prisma.educationArticle.create({
      data: { ...dto, status: 'DRAFT' },
    });
  }

  async update(id: string, dto: any) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.delete({ where: { id } });
  }

  async submitForReview(id: string) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.update({
      where: { id },
      data: { status: 'PENDING_REVIEW' },
    });
  }

  async approve(id: string) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
  }

  async reject(id: string, dto: { reason?: string }) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.update({
      where: { id },
      data: { status: 'REJECTED', reviewComment: dto.reason },
    });
  }

  async publish(id: string) {
    const article = await this.prisma.educationArticle.findUnique({ where: { id } });
    if (!article) throw new NotFoundException('文章不存在');
    return this.prisma.educationArticle.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
  }
}
