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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { patientId, doctorId, status, date, page = 1, limit = 20 } = query;
        const where = {};
        if (patientId)
            where.patientId = patientId;
        if (doctorId)
            where.doctorId = doctorId;
        if (status)
            where.status = status;
        if (date)
            where.appointmentDate = new Date(date);
        const [items, total] = await Promise.all([
            this.prisma.appointment.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { appointmentDate: 'asc' },
                include: { patient: true, doctor: true },
            }),
            this.prisma.appointment.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
            include: { patient: true, doctor: true },
        });
        if (!appointment)
            throw new common_1.NotFoundException('预约不存在');
        return appointment;
    }
    async create(dto) {
        return this.prisma.appointment.create({
            data: { ...dto, status: 'CONFIRMED' },
        });
    }
    async update(id, dto) {
        const appointment = await this.prisma.appointment.findUnique({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('预约不存在');
        return this.prisma.appointment.update({ where: { id }, data: dto });
    }
    async confirm(id) {
        const appointment = await this.prisma.appointment.findUnique({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('预约不存在');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'CONFIRMED' },
        });
    }
    async cancel(id) {
        const appointment = await this.prisma.appointment.findUnique({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('预约不存在');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async complete(id) {
        const appointment = await this.prisma.appointment.findUnique({ where: { id } });
        if (!appointment)
            throw new common_1.NotFoundException('预约不存在');
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'COMPLETED' },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map