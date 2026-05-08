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
exports.QrcodeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const qrcode_service_1 = require("./qrcode.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let QrcodeController = class QrcodeController {
    qrcodeService;
    constructor(qrcodeService) {
        this.qrcodeService = qrcodeService;
    }
    async generate(dto) {
        return this.qrcodeService.generate(dto);
    }
    async decode(dto) {
        return this.qrcodeService.decode(dto);
    }
};
exports.QrcodeController = QrcodeController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: '生成二维码' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)('decode'),
    (0, swagger_1.ApiOperation)({ summary: '解码二维码' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QrcodeController.prototype, "decode", null);
exports.QrcodeController = QrcodeController = __decorate([
    (0, swagger_1.ApiTags)('二维码'),
    (0, common_1.Controller)('qrcode'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [qrcode_service_1.QrcodeService])
], QrcodeController);
//# sourceMappingURL=qrcode.controller.js.map