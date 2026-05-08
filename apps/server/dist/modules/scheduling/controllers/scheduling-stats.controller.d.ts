import { SchedulingStatsService } from '../services/scheduling-stats.service';
export declare class SchedulingStatsController {
    private schedulingStatsService;
    constructor(schedulingStatsService: SchedulingStatsService);
    getStats(): Promise<{
        totalAppointments: number;
        confirmed: number;
        available: number;
        utilizationRate: number;
        total: number;
    }>;
}
//# sourceMappingURL=scheduling-stats.controller.d.ts.map