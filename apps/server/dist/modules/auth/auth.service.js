"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../../common/prisma/prisma.service");
const anonymize_util_1 = require("../../common/utils/anonymize.util");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(username, password) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        if (user.totpEnabled) {
            return {
                requiresTotp: true,
                userId: user.id,
            };
        }
        return this.generateToken(user);
    }
    async verifyTotp(userId, token) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.totpSecret) {
            throw new common_1.BadRequestException('用户未启用双因素认证');
        }
        const { authenticator } = require('otplib');
        const isValid = authenticator.verify({ token, secret: user.totpSecret });
        if (!isValid) {
            throw new common_1.UnauthorizedException('TOTP验证码错误');
        }
        return this.generateToken(user);
    }
    async register(dto) {
        // Verify invitation code
        const code = await this.prisma.invitationCode.findUnique({
            where: { code: dto.invitationCode },
        });
        if (!code || code.isUsed) {
            throw new common_1.BadRequestException('邀请码无效或已使用');
        }
        // Check username uniqueness
        const existing = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existing) {
            throw new common_1.ConflictException('用户名已存在');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                passwordHash,
                displayName: dto.displayName,
                role: 'PATIENT',
                hospital: dto.hospital,
                department: dto.department,
            },
        });
        // Mark invitation code as used
        await this.prisma.invitationCode.update({
            where: { id: code.id },
            data: { isUsed: true, usedBy: user.id, usedAt: new Date() },
        });
        // Create patient profile
        await this.prisma.patient.create({
            data: {
                anonymousId: (0, anonymize_util_1.generateAnonymousId)(),
                name: dto.displayName,
                department: dto.department,
            },
        });
        // Create patient user settings
        await this.prisma.patientProfile.create({
            data: { userId: user.id },
        });
        return this.generateToken(user);
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                email: true,
                phone: true,
                department: true,
                hospital: true,
                avatarUrl: true,
                totpEnabled: true,
                isFirstLogin: true,
                createdAt: true,
            },
        });
        return user;
    }
    generateToken(user) {
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role,
        };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                displayName: user.displayName,
                role: user.role,
                permissions: user.permissions,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map