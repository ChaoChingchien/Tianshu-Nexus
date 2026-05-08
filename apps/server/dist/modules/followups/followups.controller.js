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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const followups_service_1 = require("./followups.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let FollowupsController = class FollowupsController {
    followupsService;
    constructor(followupsService) {
        this.followupsService = followupsService;
    }
    async findAll(query) {
        return this.followupsService.findAll(query);
    }
    async getStats() {
        return this.followupsService.getStats();
    }
    async getTodayPending() {
        return this.followupsService.getTodayPending();
    }
    async findOne(id) {
        return this.followupsService.findById(id);
    }
    async create(dto) {
        return this.followupsService.create(dto);
    }
    async update(id, dto) {
        return this.followupsService.update(id, dto);
    }
    async execute(id, dto) {
        return this.followupsService.execute(id, dto);
    }
    async findAllRecords(query) {
        return this.followupsService.findAllRecords(query);
    }
};
exports.FollowupsController = FollowupsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取随访计划列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: '获取随访统计' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('today-pending'),
    (0, swagger_1.ApiOperation)({ summary: '获取今日待随访列表' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "getTodayPending", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取随访计划详情' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建随访计划' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新随访计划' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/execute'),
    (0, swagger_1.ApiOperation)({ summary: '执行随访' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "execute", null);
__decorate([
    (0, common_1.Get)('records'),
    (0, swagger_1.ApiOperation)({ summary: '获取随访执行记录列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowupsController.prototype, "findAllRecords", null);
exports.FollowupsController = FollowupsController = __decorate([
    (0, swagger_1.ApiTags)('随访管理'),
    (0, common_1.Controller)('followups'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [followups_service_1.FollowupsService])
], FollowupsController);
//# sourceMappingURL=followups.controller.js.map