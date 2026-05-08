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
exports.MedicationInventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let MedicationInventoryService = class MedicationInventoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { drugId, page = 1, limit = 20 } = query;
        const where = { isActive: true };
        if (drugId)
            where.id = drugId;
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
        const item = await this.prisma.drug.findUnique({
            where: { id },
        });
        if (!item)
            throw new common_1.NotFoundException('库存记录不存在');
        return item;
    }
    async update(id, dto) {
        const item = await this.prisma.drug.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('库存记录不存在');
        return this.prisma.drug.update({ where: { id }, data: dto });
    }
};
exports.MedicationInventoryService = MedicationInventoryService;
exports.MedicationInventoryService = MedicationInventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicationInventoryService);
//# sourceMappingURL=medication-inventory.service.js.map