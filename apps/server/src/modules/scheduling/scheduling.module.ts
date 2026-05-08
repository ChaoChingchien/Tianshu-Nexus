import { Module } from '@nestjs/common';
import { DoctorSchedulesController } from './controllers/doctor-schedules.controller';
import { AppointmentsController } from './controllers/appointments.controller';
import { SchedulingStatsController } from './controllers/scheduling-stats.controller';
import { DoctorSchedulesService } from './services/doctor-schedules.service';
import { AppointmentsService } from './services/appointments.service';
import { SchedulingStatsService } from './services/scheduling-stats.service';

@Module({
  controllers: [DoctorSchedulesController, AppointmentsController, SchedulingStatsController],
  providers: [DoctorSchedulesService, AppointmentsService, SchedulingStatsService],
  exports: [DoctorSchedulesService, AppointmentsService, SchedulingStatsService],
})
export class SchedulingModule {}
