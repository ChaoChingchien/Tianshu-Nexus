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
exports.DrugDictionaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DrugDictionaryService = class DrugDictionaryService {
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
    async findById(id) {
        const drug = await this.prisma.drug.findUnique({ where: { id } });
        if (!drug)
            throw new common_1.NotFoundException('药品不存在');
        return drug;
    }
    async create(dto) {
        return this.prisma.drug.create({ data: dto });
    }
    async update(id, dto) {
        const drug = await this.prisma.drug.findUnique({ where: { id } });
        if (!drug)
            throw new common_1.NotFoundException('药品不存在');
        return this.prisma.drug.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const drug = await this.prisma.drug.findUnique({ where: { id } });
        if (!drug)
            throw new common_1.NotFoundException('药品不存在');
        return this.prisma.drug.update({
            where: { id },
            data: { isActive: false },
        });
    }
};
exports.DrugDictionaryService = DrugDictionaryService;
exports.DrugDictionaryService = DrugDictionaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DrugDictionaryService);
//# sourceMappingURL=drug-dictionary.service.js.map