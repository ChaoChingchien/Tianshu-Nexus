"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_module_1 = require("./common/prisma/prisma.module");
const audit_log_interceptor_1 = require("./common/interceptors/audit-log.interceptor");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const patients_module_1 = require("./modules/patients/patients.module");
const pre_consultation_module_1 = require("./modules/pre-consultation/pre-consultation.module");
const health_records_module_1 = require("./modules/health-records/health-records.module");
const medications_module_1 = require("./modules/medications/medications.module");
const treatments_module_1 = require("./modules/treatments/treatments.module");
const scheduling_module_1 = require("./modules/scheduling/scheduling.module");
const followups_module_1 = require("./modules/followups/followups.module");
const education_module_1 = require("./modules/education/education.module");
const leave_module_1 = require("./modules/leave/leave.module");
const profile_module_1 = require("./modules/profile/profile.module");
const ai_module_1 = require("./modules/ai/ai.module");
const qrcode_module_1 = require("./modules/qrcode/qrcode.module");
const audit_module_1 = require("./modules/audit/audit.module");
const system_settings_module_1 = require("./modules/system-settings/system-settings.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            patients_module_1.PatientsModule,
            pre_consultation_module_1.PreConsultationModule,
            health_records_module_1.HealthRecordsModule,
            medications_module_1.MedicationsModule,
            treatments_module_1.TreatmentsModule,
            scheduling_module_1.SchedulingModule,
            followups_module_1.FollowupsModule,
            education_module_1.EducationModule,
            leave_module_1.LeaveModule,
            profile_module_1.ProfileModule,
            ai_module_1.AiModule,
            qrcode_module_1.QrcodeModule,
            audit_module_1.AuditModule,
            system_settings_module_1.SystemSettingsModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: audit_log_interceptor_1.AuditLogInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map