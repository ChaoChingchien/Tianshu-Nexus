#!/usr/bin/env bash
set -e

# ============================================
#  天枢 Nexus — 一键启动脚本
#  同时启动后端 (NestJS :3001) 和前端 (Next.js :3000)
# ============================================

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

# ---------- 颜色 ----------
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
info()  { echo -e "${CYAN}[INFO]${NC}  $1"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $1"; }
err()   { echo -e "${RED}[ERROR]${NC} $1"; }

# ---------- 1. 检查环境 ----------
info "检查环境..."

command -v node >/dev/null 2>&1 || { err "未安装 Node.js，请安装 Node >= 18 后重试"; exit 1; }
NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
[ "$NODE_VER" -ge 18 ] || { err "Node 版本过低 ($(node -v))，需要 >= 18"; exit 1; }

command -v pnpm >/dev/null 2>&1 || { err "未安装 pnpm，请执行: npm install -g pnpm"; exit 1; }
ok "Node $(node -v)  pnpm $(pnpm -v)"

# ---------- 2. 安装依赖 ----------
info "安装项目依赖..."
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
ok "依赖安装完成"

# ---------- 3. 构建共享包 ----------
info "构建 @tianshu/shared..."
pnpm --filter @tianshu/shared run build
ok "共享包构建完成"

# ---------- 4. 初始化数据库 ----------
info "初始化数据库 (SQLite)..."
cd "$ROOT_DIR/apps/server"

# 生成 Prisma Client
npx prisma generate
ok "Prisma Client 生成完成"

# 检查是否已有数据库
if [ ! -f "prisma/dev.db" ]; then
  # 执行迁移
  npx prisma migrate dev --name init --skip-generate 2>/dev/null || npx prisma db push
  ok "数据库迁移完成"
else
  # 已有数据库，执行 push 确保 schema 最新
  npx prisma db push --skip-generate 2>/dev/null
  ok "数据库 schema 已同步"
fi

# 种子数据
info "填充种子数据..."
npx ts-node prisma/seed.ts
ok "种子数据填充完成"

cd "$ROOT_DIR"

# ---------- 5. 启动服务 ----------
info "启动服务..."
echo ""
echo -e "  ${CYAN}后端 API:${NC}  http://localhost:3001"
echo -e "  ${CYAN}API 文档:${NC} http://localhost:3001/api/docs"
echo -e "  ${CYAN}前端:${NC}    http://localhost:3000"
echo ""
echo -e "  ${YELLOW}测试账号:${NC}"
echo -e "    管理员  admin / admin123"
echo -e "    医生    doctor1 / doctor123"
echo -e "    护士    nurse1 / nurse123"
echo ""
echo -e "  ${RED}按 Ctrl+C 同时停止两个服务${NC}"
echo ""

# 使用 pnpm 并行启动
pnpm --parallel -r run dev
