import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PreConsultationModule } from './modules/pre-consultation/pre-consultation.module';
import { HealthRecordsModule } from './modules/health-records/health-records.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { TreatmentsModule } from './modules/treatments/treatments.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { FollowupsModule } from './modules/followups/followups.module';
import { EducationModule } from './modules/education/education.module';
import { LeaveModule } from './modules/leave/leave.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AiModule } from './modules/ai/ai.module';
import { QrcodeModule } from './modules/qrcode/qrcode.module';
import { AuditModule } from './modules/audit/audit.module';
import { SystemSettingsModule } from './modules/system-settings/system-settings.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    PreConsultationModule,
    HealthRecordsModule,
    MedicationsModule,
    TreatmentsModule,
    SchedulingModule,
    FollowupsModule,
    EducationModule,
    LeaveModule,
    ProfileModule,
    AiModule,
    QrcodeModule,
    AuditModule,
    SystemSettingsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule {}
