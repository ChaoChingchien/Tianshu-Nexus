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
exports.DoctorSchedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let DoctorSchedulesService = class DoctorSchedulesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { doctorId, startDate, endDate, page = 1, limit = 20 } = query;
        const where = {};
        if (doctorId)
            where.doctorId = doctorId;
        if (startDate || endDate) {
            // DoctorSchedule does not have a date field; filter by createdAt instead
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        const [items, total] = await Promise.all([
            this.prisma.doctorSchedule.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { doctor: true },
            }),
            this.prisma.doctorSchedule.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const schedule = await this.prisma.doctorSchedule.findUnique({
            where: { id },
            include: { doctor: true },
        });
        if (!schedule)
            throw new common_1.NotFoundException('排班不存在');
        return schedule;
    }
    async create(dto) {
        return this.prisma.doctorSchedule.create({ data: dto });
    }
    async update(id, dto) {
        const schedule = await this.prisma.doctorSchedule.findUnique({ where: { id } });
        if (!schedule)
            throw new common_1.NotFoundException('排班不存在');
        return this.prisma.doctorSchedule.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const schedule = await this.prisma.doctorSchedule.findUnique({ where: { id } });
        if (!schedule)
            throw new common_1.NotFoundException('排班不存在');
        return this.prisma.doctorSchedule.delete({ where: { id } });
    }
};
exports.DoctorSchedulesService = DoctorSchedulesService;
exports.DoctorSchedulesService = DoctorSchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DoctorSchedulesService);
//# sourceMappingURL=doctor-schedules.service.js.map