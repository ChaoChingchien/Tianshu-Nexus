import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class SchedulingStatsService {
  constructor(private prisma: PrismaService) {}

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
}
