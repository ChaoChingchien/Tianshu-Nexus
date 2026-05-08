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
exports.TreatmentCatalogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const treatment_catalog_service_1 = require("../services/treatment-catalog.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
let TreatmentCatalogController = class TreatmentCatalogController {
    treatmentCatalogService;
    constructor(treatmentCatalogService) {
        this.treatmentCatalogService = treatmentCatalogService;
    }
    async findAll(query) {
        return this.treatmentCatalogService.findAll(query);
    }
    async findOne(id) {
        return this.treatmentCatalogService.findById(id);
    }
    async create(dto) {
        return this.treatmentCatalogService.create(dto);
    }
    async update(id, dto) {
        return this.treatmentCatalogService.update(id, dto);
    }
    async remove(id) {
        return this.treatmentCatalogService.remove(id);
    }
};
exports.TreatmentCatalogController = TreatmentCatalogController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取治疗项目列表' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TreatmentCatalogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取治疗项目详情' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentCatalogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '创建治疗项目' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TreatmentCatalogController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '更新治疗项目' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TreatmentCatalogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除治疗项目' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TreatmentCatalogController.prototype, "remove", null);
exports.TreatmentCatalogController = TreatmentCatalogController = __decorate([
    (0, swagger_1.ApiTags)('治疗项目目录'),
    (0, common_1.Controller)('treatments/catalog'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [treatment_catalog_service_1.TreatmentCatalogService])
], TreatmentCatalogController);
//# sourceMappingURL=treatment-catalog.controller.js.map