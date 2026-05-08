import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class SchedulingStatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalAppointments: number;
        confirmed: number;
        available: number;
        utilizationRate: number;
        total: number;
    }>;
}
//# sourceMappingURL=scheduling-stats.service.d.ts.map