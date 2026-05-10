# 天枢·NEXUS (Tianshu NEXUS)

> **AI 临床决策管理系统** — 面向中医/中西医结合医疗机构，覆盖患者全生命周期管理，融合 AI 辅助决策能力。

---

## 快速开始

```bash
# 1. 安装依赖 & 构建共享包
pnpm setup

# 2. 配置环境变量
cp .env.example apps/server/.env
cp .env.example apps/web/.env

# 3. 启动数据库（开发用 SQLite 可跳过）
docker-compose up -d

# 4. 初始化数据库
pnpm db:push
pnpm db:seed

# 5. 启动开发服务器
pnpm dev
```

打开 http://localhost:3000，使用种子账号登录：

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | `admin` | `admin123` |
| 医生 | `doctor1` | `doctor123` |
| 护士 | `nurse1` | `nurse123` |

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 后端框架 | NestJS 11 (TypeScript) |
| ORM | Prisma 6 (SQLite 开发 / PostgreSQL 生产) |
| 认证 | JWT (passport-jwt) + TOTP 两步验证 |
| 校验 | class-validator + class-transformer |
| 加密 | AES-256-GCM + HMAC + bcryptjs |
| API 文档 | Swagger → `/api/docs` |
| 前端框架 | Next.js 15 (App Router) |
| UI 库 | Ant Design 5 |
| 状态管理 | Zustand 5 |
| 基础设施 | PostgreSQL 16 + Redis 7 (Docker) |

---

## 项目结构

```
NEXUS/
├── apps/
│   ├── server/          # NestJS 后端 (端口 3001)
│   │   └── src/modules/ # 16 个业务模块
│   └── web/             # Next.js 前端 (端口 3000)
│       └── src/app/     # App Router 页面路由
├── packages/
│   └── shared/          # @tianshu/shared — 共享类型、枚举、常量
├── docker-compose.yml   # PostgreSQL + Redis
└── pnpm-workspace.yaml  # pnpm monorepo
```

---

## 功能模块

### 已完成 ✅

| 模块 | 后端 | 前端 | 说明 |
|------|:----:|:----:|------|
| 用户认证 | ✅ | ✅ | JWT 登录/TOTP 两步验证/患者邀请码注册 |
| 用户管理 | ✅ | — | 管理员 CRUD，角色/权限分配 |
| 患者管理 | ✅ | ✅ | 分类管理（住院/门诊/慈善），搜索，分页 |
| 预问诊 | ✅ | — | 三步向导式健康信息采集 |
| 健康档案 | ✅ | — | 用药史/就诊记录/检验检查/诊断 |
| 药品字典 | ✅ | ✅ | 精神类/西药/中成药分类 |
| 药品库存 | ✅ | ✅ | 低库存预警，颜色编码 |
| 药品发放 | ✅ | ✅ | 医嘱→领药→登记→确认全流程 |
| 治疗项目目录 | ✅ | ✅ | 11 种治疗分类 |
| 中医治疗 | ✅ | ✅ | 艾灸/拔罐/刮痧/耳穴/针灸/推拿 |
| 穴位知识库 | ✅ | ✅ | 定位/主治/刺法/配伍/图解 |
| 针刺手法 | ✅ | — | 手法名称/功效/操作/留针 |
| 治疗方案 | ✅ | ✅ | 草稿→执行中→已完成/已停止 |
| 排班管理 | ✅ | ✅ | 医生排班 CRUD |
| 预约管理 | ✅ | ✅ | 预约/签到/取消/未到诊 |
| 随访管理 | ✅ | ✅ | 计划/执行/统计/今日待随访 |
| 健康教育 | ✅ | ✅ | 草稿→审核→发布→拒绝流程 |
| 患者分组 | ✅ | ✅ | 定向推送分组管理 |
| 请假/外出 | ✅ | ✅ | 申请→审批→返回确认 |
| 个人中心 | ✅ | — | 资料/密码/医生作品集 |
| 审计日志 | ✅ | ✅ | 自动记录/筛选/统计 |
| 系统设置 | ✅ | ✅ | 安全/注册/审计/隐私配置 |
| 二维码 | ✅ | ✅ | 生成/解码，支持分块传输 |

### 开发中 🚧

| 模块 | 状态 | 待完成 |
|------|:----:|------|
| AI 决策引擎 | 🚧 | 接口已搭建，当前为模拟数据。待接入：HTE 因果森林、NLP 结构化、OCR 处方识别、风险评估模型 |
| 患者隐私加密 | 🚧 | Schema 支持 AES 加密字段，前端脱敏展示待完善 |
| 排班日历视图 | 🚧 | 后端已就绪，前端日历组件待开发 |

### 计划迭代 📋

- [ ] AI 引擎接入真实模型（LLM/因果森林/OCR）
- [ ] 数据大屏 / 运营看板
- [ ] 多院区/多科室支持
- [ ] 微信小程序患者端
- [ ] 消息通知系统（站内信/短信/邮件）
- [ ] 数据导入导出（Excel/PDF）
- [ ] 自动化测试覆盖
- [ ] CI/CD 流水线

---

## 后端 API 统计

| 模块 | 端点数 | 状态 |
|------|:------:|:----:|
| auth | 4 | ✅ |
| users | 5 | ✅ |
| patients | 5 | ✅ |
| pre-consultation | 6 | ✅ |
| health-records | 5 | ✅ |
| medications (4 controllers) | ~20 | ✅ |
| treatments (5 controllers) | ~25 | ✅ |
| scheduling (3 controllers) | ~15 | ✅ |
| followups | 8 | ✅ |
| education (2 controllers) | 12 | ✅ |
| leave | 7 | ✅ |
| profile | 7 | ✅ |
| ai | 8 | 🚧 mock |
| qrcode | 2 | ✅ |
| audit | 3 | ✅ |
| system-settings | 2 | ✅ |
| **合计** | **~134** | |

---

## 前端页面统计

| 路由 | 页面数 | 状态 |
|------|:------:|:----:|
| /login | 1 | ✅ |
| /register | 1 | ✅ |
| /dashboard | 1 | ✅ |
| /patients | 4 | ✅ |
| /scheduling | 3 | ✅ |
| /treatments | 4 | ✅ |
| /medications | 4 | ✅ |
| /followups | 2 | ✅ |
| /education | 2 | ✅ |
| /leave | 2 | ✅ |
| /ai | 3 | ✅ |
| /qrcode | 2 | ✅ |
| /audit | 1 | ✅ |
| /profile | 2 | ✅ |
| /settings | 1 | ✅ |
| **合计** | **33** | |

---

## 常用命令

```bash
pnpm dev                  # 并行启动前后端
pnpm build                # 构建所有包
pnpm lint                 # 类型检查
pnpm test                 # 运行测试

# 数据库
pnpm db:generate          # 生成 Prisma Client
pnpm db:push              # 同步 schema（开发）
pnpm db:migrate           # 生成迁移文件（生产）
pnpm db:seed              # 填充测试数据
pnpm db:studio            # Prisma Studio 管理界面

# 单独启动
pnpm --filter @tianshu/server run dev    # 后端 :3001
pnpm --filter @tianshu/web run dev       # 前端 :3000
```

---

## 环境变量

```env
# 数据库
DATABASE_URL=postgresql://tianshu:tianshu123@localhost:5432/tianshu_db

# JWT
JWT_SECRET=<random-secret>
JWT_EXPIRATION=24h

# 加密
ENCRYPTION_KEY=<32-byte-hex>
HMAC_SECRET=<random-secret>

# 服务
SERVER_PORT=3001
CORS_ORIGIN=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

---

## 贡献指南

1. 新增模块需同时在 shared/server/web 三层添加代码
2. 共享类型/枚举放在 `packages/shared/src/`，修改后执行 `pnpm --filter @tianshu/shared run build`
3. 后端遵循 NestJS 模块化规范：`module → controller → service → dto`
4. 前端 API 调用统一通过 `src/services/` 下的 service 文件，使用 `api-client.ts` 统一配置的 Axios 实例
5. 提交前运行 `pnpm lint` 确保类型检查通过
