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
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AiService = class AiService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async hte(dto) {
        // Mock HTE (Heterogeneous Treatment Effect) evaluation
        return {
            success: true,
            data: {
                treatmentEffect: 0.75,
                confidence: 0.85,
                subgroups: [
                    { group: 'A', effect: 0.82, size: 120 },
                    { group: 'B', effect: 0.65, size: 80 },
                ],
                recommendations: ['治疗方案A效果较好', '建议结合患者体质调整'],
            },
            metadata: { model: 'hte-mock-v1', timestamp: new Date().toISOString() },
        };
    }
    async risk(dto) {
        // Mock risk assessment
        return {
            success: true,
            data: {
                riskLevel: dto.patientId ? 'medium' : 'low',
                score: 65,
                factors: [
                    { name: '年龄', weight: 0.2, value: '中等风险' },
                    { name: '既往病史', weight: 0.3, value: '低风险' },
                    { name: '生活习惯', weight: 0.5, value: '中等风险' },
                ],
                suggestions: ['建议定期复查', '注意饮食调理'],
            },
            metadata: { model: 'risk-mock-v1', timestamp: new Date().toISOString() },
        };
    }
    async nlp(dto) {
        // Mock NLP processing
        return {
            success: true,
            data: {
                entities: [
                    { text: '头痛', type: 'symptom', confidence: 0.95 },
                    { text: '3天', type: 'duration', confidence: 0.90 },
                    { text: '布洛芬', type: 'medication', confidence: 0.88 },
                ],
                summary: '患者主诉头痛3天，曾服用布洛芬效果不佳。',
                keywords: ['头痛', '布洛芬', '持续性'],
                sentiment: 'neutral',
            },
            metadata: { model: 'nlp-mock-v1', timestamp: new Date().toISOString() },
        };
    }
    async ocr(dto) {
        // Mock OCR processing
        return {
            success: true,
            data: {
                text: dto.imageUrl ? '模拟OCR识别结果：处方单内容...' : '未提供图片',
                confidence: 0.92,
                fields: [
                    { name: '药品名称', value: '复方丹参滴丸', confidence: 0.95 },
                    { name: '用法用量', value: '口服 10粒/次 3次/日', confidence: 0.90 },
                    { name: '医师签名', value: '张医生', confidence: 0.85 },
                ],
            },
            metadata: { model: 'ocr-mock-v1', timestamp: new Date().toISOString() },
        };
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AiService);
//# sourceMappingURL=ai.service.js.map