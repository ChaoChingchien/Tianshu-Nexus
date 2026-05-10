# Project Instructions

This file provides context for AI assistants working on this project.

## Project Overview

**天枢·NEXUS (Tianshu NEXUS)** — AI 临床决策管理系统，为中医/中西医结合医疗机构提供患者管理、诊疗追踪、AI 辅助决策、用药管理和健康宣教等功能。

## Architecture

```
NEXUS/
├── apps/
│   ├── server/          # NestJS 后端 (TypeScript)
│   └── web/             # Next.js 15 前端 (React 19)
├── packages/
│   └── shared/          # 共享类型、枚举、常量
├── docker-compose.yml   # PostgreSQL + Redis
└── pnpm-workspace.yaml  # pnpm monorepo
```

- **Package manager**: pnpm (>=8.0.0), Node.js >=18.0.0
- **Shared package**: `@tianshu/shared` — 所有枚举、类型定义、常量集中在此，前后端均依赖
- **Frontend uses** `transpilePackages: ['@tianshu/shared', 'antd']` in next.config.ts

## Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | NestJS 11 |
| ORM | Prisma 6 (SQLite dev / PostgreSQL prod) |
| Auth | JWT (passport-jwt) + TOTP 2FA (otplib) |
| Validation | class-validator + class-transformer |
| API docs | Swagger (@nestjs/swagger) at `/api/docs` |
| Encryption | AES-256-GCM + HMAC |
| Frontend framework | Next.js 15 (App Router, standalone output) |
| UI library | Ant Design 5 + @ant-design/icons |
| State management | Zustand 5 |
| HTTP client | Axios |
| Date handling | dayjs |

## Commands

### Root (monorepo)

```bash
pnpm install                           # 安装所有依赖
pnpm dev                               # 并行启动前后端
pnpm build                             # 构建所有包
pnpm lint                              # 所有包 lint
pnpm test                              # 所有包测试

# 首次初始化（按顺序）
pnpm setup                             # install + 构建 shared 包
pnpm db:generate                       # 生成 Prisma Client
pnpm db:push                           # 同步 schema 到数据库
pnpm db:seed                           # 填充种子数据
```

### Server (`apps/server`)

```bash
pnpm --filter @tianshu/server run dev          # 启动开发服务器 (端口 3001)
pnpm --filter @tianshu/server run build        # 构建
pnpm --filter @tianshu/server run lint         # 类型检查 (tsc --noEmit)
pnpm db:generate                               # prisma generate
pnpm db:push                                   # prisma db push
pnpm db:migrate                                # prisma migrate dev
pnpm db:seed                                   # 填充种子数据
pnpm db:studio                                 # prisma studio
```

### Web (`apps/web`)

```bash
pnpm --filter @tianshu/web run dev     # 启动 Next.js 开发服务器 (端口 3000)
pnpm --filter @tianshu/web run build   # 构建
pnpm --filter @tianshu/web run lint    # next lint
```

### Docker

```bash
docker-compose up -d                    # 启动 PostgreSQL + Redis
```

## Backend Module Structure

每个业务模块遵循 NestJS 最佳实践，标准目录结构：

```
src/modules/<module>/
├── <module>.module.ts
├── <module>.controller.ts
├── <module>.service.ts
├── dto/
│   ├── create-<entity>.dto.ts
│   └── update-<entity>.dto.ts
└── entities/
    └── <entity>.entity.ts
```

### 已注册模块

| Module | 职责 |
|---|---|
| auth | JWT 认证、登录/注册、TOTP 两步验证 |
| users | 用户 CRUD、角色管理 |
| patients | 患者档案、分类管理（住院/门诊/慈善） |
| pre-consultation | 预问诊 |
| health-records | 健康档案 |
| medications | 药品管理（精神类/西药/中成药） |
| treatments | 诊疗方案、中医治疗（针灸/推拿/艾灸/拔罐/刮痧/耳穴） |
| scheduling | 预约排班 |
| followups | 随访管理 |
| education | 健康教育文章 |
| leave | 请假/外出管理 |
| profile | 医生/患者个人资料 |
| ai | AI 辅助决策 |
| qrcode | 二维码 |
| audit | 审计日志 |
| system-settings | 系统设置 |

### 全局配置

- API 前缀: `/api`
- 版本控制: URI versioning，默认 v1 → `/api/v1/...`
- CORS: 允许 `${CORS_ORIGIN}` (默认 `http://localhost:3000`)
- 全局管道: `ValidationPipe` (whitelist, transform, forbidNonWhitelisted)
- 全局拦截器: `AuditLogInterceptor` (自动记录操作审计日志)
- 端口: `${SERVER_PORT}` (默认 3001)

## Prisma Schema

- **开发环境**: SQLite (`apps/server/prisma/dev.db`)
- **生产环境**: PostgreSQL (通过 docker-compose)
- **数据库 URL**: 通过 `DATABASE_URL` 环境变量配置

### 角色枚举

- `ADMIN` — 系统管理员
- `DOCTOR` — 医生
- `NURSE` — 护士
- `PATIENT` — 患者

### 核心模型关系

- `User` 1:1 `DoctorProfile` / `PatientProfile`
- `Patient` 关联创建医生 (`createdBy`) 和主治医生 (`primaryDoctor`)
- `Appointment` 关联患者和医生
- `FollowUp` 关联患者
- `TreatmentPlan` 包含多条 `TreatmentRecord`，可关联转诊 (`ReferralRecord`)
- `EducationArticle` 支持草稿→审核→发布→拒绝 流程
- `AuditLog` 全局审计，记录所有敏感操作

## Frontend Structure

```
src/app/
├── layout.tsx           # 根布局 (AntdRegistry + Providers)
├── page.tsx             # 首页 (重定向到 /dashboard)
├── login/               # 登录页
├── register/            # 注册页
├── dashboard/           # 仪表盘/工作台
├── patients/            # 患者管理
├── scheduling/          # 预约排班
├── treatments/          # 诊疗管理
├── medications/         # 用药管理
├── followups/           # 随访管理
├── education/           # 健康教育
├── leave/               # 请假管理
├── ai/                  # AI 辅助
├── qrcode/              # 二维码
├── audit/               # 审计日志
├── profile/             # 个人资料
└── settings/            # 系统设置
```

- **状态管理**: `src/stores/authStore.ts` (认证), `src/stores/appStore.ts` (全局)
- **API 服务**: `src/services/*.service.ts` — 每个模块对应一个 service 文件，通过 `src/services/api-client.ts` 统一配置的 Axios 实例发起请求
- **CSS**: `src/app/globals.css` + Ant Design 主题

## Environment Variables

```env
# 数据库
DATABASE_URL=postgresql://tianshu:tianshu123@localhost:5432/tianshu_db

# JWT
JWT_SECRET=<random-secret>
JWT_EXPIRATION=24h

# 加密 (AES-256-GCM, 32字节十六进制)
ENCRYPTION_KEY=<32-byte-hex>
HMAC_SECRET=<random-secret>

# Redis
REDIS_URL=redis://localhost:6379

# 服务端口
SERVER_PORT=3001

# 前端 API 地址
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

配置文件: `apps/server/.env` 和 `apps/web/.env`（基于 `.env.example` 创建）

## Development Guidelines

### Code Style
- TypeScript strict mode
- NestJS: 使用装饰器模式，DTO 用 `class-validator` 声明校验规则
- Next.js: App Router，页面组件放在 `src/app/<route>/page.tsx`
- 共享类型定义在 `packages/shared/src/types/`，枚举在 `packages/shared/src/enums/`
- API 响应遵循统一格式（由服务端统一封装）

### Adding a New Module

1. **Shared**: 在 `packages/shared/src/types/` 添加类型定义，在 `enums/` 添加枚举（如有），从 `index.ts` 导出
2. **Server**: 在 `apps/server/src/modules/` 创建 module/controller/service/dto，在 `app.module.ts` 注册
3. **Web**: 在 `apps/web/src/app/` 创建路由页面，在 `src/services/` 添加对应的 service 文件

### Testing

- 服务端: NestJS 默认使用 Jest
- 前端: Next.js 默认测试方案
- 运行: `pnpm test` (全量) 或 `pnpm --filter <package> run test -- <pattern>`

### Database Changes

1. 修改 `apps/server/prisma/schema.prisma`
2. 运行 `pnpm db:generate` 重新生成 Prisma Client
3. 开发环境: `pnpm db:push` (直接推送，不生成迁移文件)
4. 生产环境: `pnpm db:migrate` (生成迁移文件)
5. 填充测试数据: `pnpm db:seed`

## Important Notes

- 前端 API 请求统一通过 `src/services/api-client.ts` 的 Axios 实例，自动附加 JWT token
- 密码使用 bcryptjs 哈希，敏感数据使用 AES-256-GCM 加密
- TOTP 两步验证默认关闭，可在系统设置中启用
- 审计日志通过全局拦截器自动记录，可在 `SystemSettings.enableAuditLog` 控制
- SQLite 仅用于开发环境，生产必须使用 PostgreSQL
- Shared 包修改后需重新构建: `pnpm --filter @tianshu/shared run build`
- 首次启动必须按顺序: `pnpm setup` → 配置 `.env` → `pnpm db:push` → `pnpm db:seed` → `pnpm dev`
