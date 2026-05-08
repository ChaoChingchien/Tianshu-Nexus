@echo off
setlocal enabledelayedexpansion

set ROOT_DIR=%~dp0
cd /d "%ROOT_DIR%"

echo.
echo ============================================
echo   Tianshu Nexus - Quick Start
echo ============================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] Node.js not found. Install Node 18+ first.
    pause
    exit /b 1
)
echo [OK] Node found.

where pnpm >nul 2>&1
if %errorlevel% neq 0 (
    echo [FAIL] pnpm not found. Run: npm install -g pnpm
    pause
    exit /b 1
)
echo [OK] pnpm found.

echo.
echo [1/5] Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo [FAIL] Install failed.
    pause
    exit /b 1
)
echo [OK] Dependencies installed.

echo [2/5] Building shared package...
cd /d "%ROOT_DIR%packages\shared"
call npx tsc
if %errorlevel% neq 0 (
    echo [FAIL] Build failed.
    pause
    exit /b 1
)
echo [OK] Shared package built.

echo [3/5] Generating Prisma Client...
cd /d "%ROOT_DIR%apps\server"
call npx prisma generate
if %errorlevel% neq 0 (
    echo [FAIL] Prisma generate failed.
    pause
    exit /b 1
)
echo [OK] Prisma Client generated.

echo [4/5] Syncing database...
call npx prisma db push --skip-generate
if %errorlevel% neq 0 (
    echo [FAIL] Database sync failed.
    pause
    exit /b 1
)
echo [OK] Database synced.

echo [5/5] Seeding data...
call npx ts-node prisma/seed.ts
if %errorlevel% neq 0 (
    echo [FAIL] Seed failed.
    pause
    exit /b 1
)
echo [OK] Database seeded.

cd /d "%ROOT_DIR%"
echo.
echo ============================================
echo   All ready! Starting services...
echo ============================================
echo.
echo   Backend:  http://localhost:3001
echo   API Doc:  http://localhost:3001/api/docs
echo   Frontend: http://localhost:3000
echo.
echo   Accounts:
echo     admin   / admin123
echo     doctor1 / doctor123
echo     nurse1  / nurse123
echo.
echo ============================================
echo.

start "Tianshu-Backend" cmd /c "cd /d "%ROOT_DIR%" && pnpm --filter @tianshu/server run dev"
start "Tianshu-Frontend" cmd /c "cd /d "%ROOT_DIR%" && pnpm --filter @tianshu/web run dev"

echo Backend and frontend started in new windows.
echo Close this window to stop all services.
pause
