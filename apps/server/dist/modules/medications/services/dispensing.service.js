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
exports.DispensingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DispensingService = class DispensingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { orderId, patientId, page = 1, limit = 20 } = query;
        const where = {};
        if (patientId)
            where.patientId = patientId;
        const [items, total] = await Promise.all([
            this.prisma.dispensingRecord.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { drug: true, dispensedBy: true },
            }),
            this.prisma.dispensingRecord.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const record = await this.prisma.dispensingRecord.findUnique({
            where: { id },
            include: { drug: true, dispensedBy: true },
        });
        if (!record)
            throw new common_1.NotFoundException('发药记录不存在');
        return record;
    }
    async dispense(dto) {
        return this.prisma.dispensingRecord.create({
            data: { ...dto, status: 'DISPENSED' },
        });
    }
    async confirm(id) {
        const record = await this.prisma.dispensingRecord.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('发药记录不存在');
        return this.prisma.dispensingRecord.update({
            where: { id },
            data: { status: 'DISPENSED' },
        });
    }
};
exports.DispensingService = DispensingService;
exports.DispensingService = DispensingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DispensingService);
//# sourceMappingURL=dispensing.service.js.map