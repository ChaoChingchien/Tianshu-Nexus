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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const prisma_service_1 = require("../../common/prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const where = { deletedAt: null };
        if (query.role) {
            where.role = query.role;
        }
        if (query.search) {
            where.OR = [
                { username: { contains: query.search } },
                { displayName: { contains: query.search } },
            ];
        }
        return this.prisma.user.findMany({
            where,
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                isActive: true,
                email: true,
                phone: true,
                department: true,
                hospital: true,
                permissions: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                isActive: true,
                email: true,
                phone: true,
                department: true,
                hospital: true,
                permissions: true,
                totpEnabled: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('用户不存在');
        return user;
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existing)
            throw new common_1.ConflictException('用户名已存在');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                username: dto.username,
                passwordHash,
                displayName: dto.displayName,
                role: dto.role,
                department: dto.department,
                hospital: dto.hospital,
                email: dto.email,
                phone: dto.phone,
                permissions: dto.permissions,
            },
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                createdAt: true,
            },
        });
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('用户不存在');
        return this.prisma.user.update({
            where: { id },
            data: dto,
            select: {
                id: true,
                username: true,
                displayName: true,
                role: true,
                isActive: true,
                permissions: true,
            },
        });
    }
    async remove(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('用户不存在');
        // Soft delete
        return this.prisma.user.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map