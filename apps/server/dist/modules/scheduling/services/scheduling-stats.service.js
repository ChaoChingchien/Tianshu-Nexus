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
exports.SchedulingStatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let SchedulingStatsService = class SchedulingStatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const [totalAppointments, confirmed, available] = await Promise.all([
            this.prisma.appointment.count(),
            this.prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
            this.prisma.doctorSchedule.count({ where: { isAvailable: true } }),
        ]);
        const utilizationRate = totalAppointments > 0
            ? Math.round((confirmed / totalAppointments) * 100)
            : 0;
        return {
            totalAppointments,
            confirmed,
            available,
            utilizationRate,
            total: totalAppointments,
        };
    }
};
exports.SchedulingStatsService = SchedulingStatsService;
exports.SchedulingStatsService = SchedulingStatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulingStatsService);
//# sourceMappingURL=scheduling-stats.service.js.map