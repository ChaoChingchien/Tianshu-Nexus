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
exports.QrcodeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let QrcodeService = class QrcodeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generate(dto) {
        if (!dto.data) {
            throw new common_1.BadRequestException('请输入要编码的数据');
        }
        // Mock QR code generation - in production would use a QR library
        return {
            success: true,
            data: {
                content: dto.data,
                qrcode: `data:image/png;base64,mock_qr_code_for_${Buffer.from(dto.data).toString('base64')}`,
                format: 'png',
                size: dto.options?.size || 256,
            },
        };
    }
    async decode(dto) {
        if (!dto.image) {
            throw new common_1.BadRequestException('请提供二维码图片');
        }
        // Mock QR code decoding
        return {
            success: true,
            data: {
                text: '模拟解码结果: patient-12345',
                format: 'qrcode',
            },
        };
    }
};
exports.QrcodeService = QrcodeService;
exports.QrcodeService = QrcodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QrcodeService);
//# sourceMappingURL=qrcode.service.js.map