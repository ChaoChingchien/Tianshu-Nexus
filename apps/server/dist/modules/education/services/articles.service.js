"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, status, category, page = 1, limit = 20 } = query;
        const where = { deletedAt: null };
        if (status)
            where.status = status;
        if (category)
            where.category = category;
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
    async findById(id) {
        const article = await this.prisma.educationArticle.findUnique({
            where: { id },
            include: { createdBy: true },
        });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return article;
    }
    async create(dto) {
        return this.prisma.educationArticle.create({
            data: { ...dto, status: 'DRAFT' },
        });
    }
    async update(id, dto) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.delete({ where: { id } });
    }
    async submitForReview(id) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.update({
            where: { id },
            data: { status: 'PENDING_REVIEW' },
        });
    }
    async approve(id) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.update({
            where: { id },
            data: { status: 'PUBLISHED', publishedAt: new Date() },
        });
    }
    async reject(id, dto) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.update({
            where: { id },
            data: { status: 'REJECTED', reviewComment: dto.reason },
        });
    }
    async publish(id) {
        const article = await this.prisma.educationArticle.findUnique({ where: { id } });
        if (!article)
            throw new common_1.NotFoundException('文章不存在');
        return this.prisma.educationArticle.update({
            where: { id },
            data: { status: 'PUBLISHED', publishedAt: new Date() },
        });
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map