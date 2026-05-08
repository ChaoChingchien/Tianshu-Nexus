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
exports.PatientGroupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const patient_groups_service_1 = require("../services/patient-groups.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
let PatientGroupsController = class PatientGroupsController {
    patientGroupsService;
    constructor(patientGroupsService) {
        this.patientGroupsService = patientGroupsService;
    }
    async findAll(query) {
        return this.patientGroupsService.findAll(query);
    }
    async findOne(id) {
        return this.patientGroupsService.findById(id);
    }
    async create(dto) {
        return this.patientGroupsService.create(dto);
    }
    async update(id, dto) {
        return this.patientGroupsService.update(id, dto);
    }
    async remove(id) {
        return this.patientGroupsService.remove(id);
    }
    async addPatients(id, dto) {
        return this.patientGroupsService.addPatients(id, dto.patientIds);
    }
    async removePatient(id, patientId) {
        return this.patientGroupsService.removePatient(id, patientId);
    }
};
exports.PatientGroupsController = PatientGroupsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取分组列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取分组详情' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建分组' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新分组' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除分组' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/patients'),
    (0, swagger_1.ApiOperation)({ summary: '添加患者到分组' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "addPatients", null);
__decorate([
    (0, common_1.Delete)(':id/patients/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: '从分组移除患者' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PatientGroupsController.prototype, "removePatient", null);
exports.PatientGroupsController = PatientGroupsController = __decorate([
    (0, swagger_1.ApiTags)('患者分组'),
    (0, common_1.Controller)('education/patient-groups'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [patient_groups_service_1.PatientGroupsService])
], PatientGroupsController);
//# sourceMappingURL=patient-groups.controller.js.map