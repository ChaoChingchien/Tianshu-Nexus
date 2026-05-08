import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { patientId?: string; doctorId?: string; status?: string; date?: string; page?: number; limit?: number }) {
    const { patientId, doctorId, status, date, page = 1, limit = 20 } = query;
    const where: any = {};

    if (patientId) where.patientId = patientId;
    if (doctorId) where.doctorId = doctorId;
    if (status) where.status = status;
    if (date) where.appointmentDate = new Date(date);

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

  async findById(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
    if (!appointment) throw new NotFoundException('预约不存在');
    return appointment;
  }

  async create(dto: any) {
    return this.prisma.appointment.create({
      data: { ...dto, status: 'CONFIRMED' },
    });
  }

  async update(id: string, dto: any) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('预约不存在');
    return this.prisma.appointment.update({ where: { id }, data: dto });
  }

  async confirm(id: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('预约不存在');
    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CONFIRMED' },
    });
  }

  async cancel(id: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('预约不存在');
    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
  }

  async complete(id: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('预约不存在');
    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
  }
}
