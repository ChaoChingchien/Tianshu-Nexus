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
exports.TreatmentCatalogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TreatmentCatalogService = class TreatmentCatalogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, category, page = 1, limit = 20 } = query;
        const where = { deletedAt: null };
        if (category)
            where.category = category;
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
    async findById(id) {
        const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('治疗项目不存在');
        return item;
    }
    async create(dto) {
        return this.prisma.treatmentItem.create({ data: dto });
    }
    async update(id, dto) {
        const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('治疗项目不存在');
        return this.prisma.treatmentItem.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const item = await this.prisma.treatmentItem.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('治疗项目不存在');
        return this.prisma.treatmentItem.update({
            where: { id },
            data: { isActive: false },
        });
    }
};
exports.TreatmentCatalogService = TreatmentCatalogService;
exports.TreatmentCatalogService = TreatmentCatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreatmentCatalogService);
//# sourceMappingURL=treatment-catalog.service.js.map