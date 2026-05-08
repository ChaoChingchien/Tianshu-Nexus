"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulingModule = void 0;
const common_1 = require("@nestjs/common");
const doctor_schedules_controller_1 = require("./controllers/doctor-schedules.controller");
const appointments_controller_1 = require("./controllers/appointments.controller");
const scheduling_stats_controller_1 = require("./controllers/scheduling-stats.controller");
const doctor_schedules_service_1 = require("./services/doctor-schedules.service");
const appointments_service_1 = require("./services/appointments.service");
const scheduling_stats_service_1 = require("./services/scheduling-stats.service");
let SchedulingModule = class SchedulingModule {
};
exports.SchedulingModule = SchedulingModule;
exports.SchedulingModule = SchedulingModule = __decorate([
    (0, common_1.Module)({
        controllers: [doctor_schedules_controller_1.DoctorSchedulesController, appointments_controller_1.AppointmentsController, scheduling_stats_controller_1.SchedulingStatsController],
        providers: [doctor_schedules_service_1.DoctorSchedulesService, appointments_service_1.AppointmentsService, scheduling_stats_service_1.SchedulingStatsService],
        exports: [doctor_schedules_service_1.DoctorSchedulesService, appointments_service_1.AppointmentsService, scheduling_stats_service_1.SchedulingStatsService],
    })
], SchedulingModule);
//# sourceMappingURL=scheduling.module.js.map