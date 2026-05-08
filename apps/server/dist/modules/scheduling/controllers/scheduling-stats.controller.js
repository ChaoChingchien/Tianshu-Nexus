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
exports.SchedulingStatsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const scheduling_stats_service_1 = require("../services/scheduling-stats.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
let SchedulingStatsController = class SchedulingStatsController {
    schedulingStatsService;
    constructor(schedulingStatsService) {
        this.schedulingStatsService = schedulingStatsService;
    }
    async getStats() {
        return this.schedulingStatsService.getStats();
    }
};
exports.SchedulingStatsController = SchedulingStatsController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: '获取排班统计' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulingStatsController.prototype, "getStats", null);
exports.SchedulingStatsController = SchedulingStatsController = __decorate([
    (0, swagger_1.ApiTags)('排班统计'),
    (0, common_1.Controller)('scheduling'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [scheduling_stats_service_1.SchedulingStatsService])
], SchedulingStatsController);
//# sourceMappingURL=scheduling-stats.controller.js.map