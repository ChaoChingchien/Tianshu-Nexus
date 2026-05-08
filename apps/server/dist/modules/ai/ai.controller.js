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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ai_service_1 = require("./ai.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async htePredict(dto) {
        return this.aiService.hte(dto);
    }
    async hte(dto) {
        return this.aiService.hte(dto);
    }
    async riskAssessment(patientId) {
        return this.aiService.risk({ patientId });
    }
    async risk(dto) {
        return this.aiService.risk(dto);
    }
    async nlpStructurize(dto) {
        return this.aiService.nlp(dto);
    }
    async nlp(dto) {
        return this.aiService.nlp(dto);
    }
    async ocrPrescription(dto) {
        return this.aiService.ocr(dto);
    }
    async ocr(dto) {
        return this.aiService.ocr(dto);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('hte/predict'),
    (0, swagger_1.ApiOperation)({ summary: 'HTE - 异质性治疗效应预测' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "htePredict", null);
__decorate([
    (0, common_1.Post)('hte'),
    (0, swagger_1.ApiOperation)({ summary: 'HTE模拟 - 异质性治疗效应评估' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "hte", null);
__decorate([
    (0, common_1.Get)('risk-assessment/:patientId'),
    (0, swagger_1.ApiOperation)({ summary: '风险评估' }),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "riskAssessment", null);
__decorate([
    (0, common_1.Post)('risk'),
    (0, swagger_1.ApiOperation)({ summary: '风险评估' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "risk", null);
__decorate([
    (0, common_1.Post)('nlp/structurize'),
    (0, swagger_1.ApiOperation)({ summary: 'NLP - 自然语言处理' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "nlpStructurize", null);
__decorate([
    (0, common_1.Post)('nlp'),
    (0, swagger_1.ApiOperation)({ summary: 'NLP - 自然语言处理' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "nlp", null);
__decorate([
    (0, common_1.Post)('ocr/prescription'),
    (0, swagger_1.ApiOperation)({ summary: 'OCR - 处方识别' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "ocrPrescription", null);
__decorate([
    (0, common_1.Post)('ocr'),
    (0, swagger_1.ApiOperation)({ summary: 'OCR - 光学字符识别' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "ocr", null);
exports.AiController = AiController = __decorate([
    (0, swagger_1.ApiTags)('AI模拟接口'),
    (0, common_1.Controller)('ai'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map