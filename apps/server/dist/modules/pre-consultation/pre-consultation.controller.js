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
exports.PreConsultationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pre_consultation_service_1 = require("./pre-consultation.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let PreConsultationController = class PreConsultationController {
    preConsultationService;
    constructor(preConsultationService) {
        this.preConsultationService = preConsultationService;
    }
    async findAll(query) {
        return this.preConsultationService.findAll(query);
    }
    async findOne(id) {
        return this.preConsultationService.findById(id);
    }
    async create(dto) {
        return this.preConsultationService.create(dto);
    }
    async update(id, dto) {
        return this.preConsultationService.update(id, dto);
    }
    async submitStep1(id, dto) {
        return this.preConsultationService.submitStep(id, 1, dto);
    }
    async submitStep2(id, dto) {
        return this.preConsultationService.submitStep(id, 2, dto);
    }
    async submitStep3(id, dto) {
        return this.preConsultationService.submitStep(id, 3, dto);
    }
};
exports.PreConsultationController = PreConsultationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取预诊问卷列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取预诊问卷详情' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建预诊问卷' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新预诊问卷' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/submit-step1'),
    (0, swagger_1.ApiOperation)({ summary: '提交第一步：基本信息' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "submitStep1", null);
__decorate([
    (0, common_1.Post)(':id/submit-step2'),
    (0, swagger_1.ApiOperation)({ summary: '提交第二步：症状信息' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "submitStep2", null);
__decorate([
    (0, common_1.Post)(':id/submit-step3'),
    (0, swagger_1.ApiOperation)({ summary: '提交第三步：完成并提交' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreConsultationController.prototype, "submitStep3", null);
exports.PreConsultationController = PreConsultationController = __decorate([
    (0, swagger_1.ApiTags)('预诊咨询'),
    (0, common_1.Controller)('pre-consultation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pre_consultation_service_1.PreConsultationService])
], PreConsultationController);
//# sourceMappingURL=pre-consultation.controller.js.map