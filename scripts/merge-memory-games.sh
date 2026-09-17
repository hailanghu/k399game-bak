#!/usr/bin/env bash
# ============================================================
# k399game.com — 记忆游戏合并（本地运行，需要 wrangler 已登录）
#
# 前置：
#   1. 已安装 wrangler 且 `wrangler login` 完成（有 k399game 项目权限）
#   2. 在本仓库根目录执行：bash scripts/merge-memory-games.sh
#
# 它做的事：
#   - 备份整库 games 表到 scripts/backup-games-<时间>.sql（可回滚）
#   - 执行 scripts/merge-memory-games.sql：
#       删除空 slug 的「记忆力小游戏」和重复的 memory-test
#       插入 canonical 的 memory-match
#   - 提示重新部署（让 public/games/memory-match/index.html 上线）
#
# 如需指定环境/数据库，按需修改下面的 WRANGLER_ARGS。
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."

DB_NAME="k399game-db"
# 若线上在 production 环境且 wrangler 报错，可改为：
# WRANGLER_ARGS="--env production"
WRANGLER_ARGS=""

TS="$(date +%Y%m%d-%H%M%S)"
BACKUP="scripts/backup-games-${TS}.sql"

echo ">>> [1/3] 备份数据库到 ${BACKUP} ..."
npx wrangler d1 export "${DB_NAME}" ${WRANGLER_ARGS} --remote --output="${BACKUP}" || {
  echo "导出失败（可能是 --env 问题）。请确认 wrangler 登录与项目权限，必要时加 --env production 重试。"
  exit 1
}

echo ">>> [2/3] 执行合并 SQL ..."
npx wrangler d1 execute "${DB_NAME}" ${WRANGLER_ARGS} --remote --file=scripts/merge-memory-games.sql

echo ">>> [3/3] 校验结果 ..."
npx wrangler d1 execute "${DB_NAME}" ${WRANGLER_ARGS} --remote --command="SELECT slug, title FROM games WHERE category='puzzle' ORDER BY created_at DESC;"

echo ""
echo "✅ 合并完成。"
echo "⚠️  还需重新部署站点，让静态游戏文件 public/games/memory-match/index.html 随构建产物上线："
echo "    npm run build && npx wrangler pages deploy .vercel/output/static --project-name=k399game"
echo ""
echo "🔁 如需回滚：用备份文件恢复 ——"
echo "    npx wrangler d1 execute ${DB_NAME} ${WRANGLER_ARGS} --remote --file=${BACKUP}"
