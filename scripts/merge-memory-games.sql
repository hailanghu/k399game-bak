-- ============================================================
-- k399game.com 记忆游戏合并脚本 (D1)
-- 作用：删除重复且打不开的记忆游戏，保留一个 canonical 版本。
--   1) 删除 slug='' 的「记忆力小游戏」（线上根因：空 slug → 详情页 302 回列表页，打不开）
--   2) 删除 slug='memory-test' 的重复项
--   3) 插入 canonical 的 'memory-match'（游戏本体是仓库静态文件
--      public/games/memory-match/index.html，部署后由 play 路由 302 提供）
-- 执行前请先备份（见 merge-memory-games.sh）。执行后需重新部署站点，
-- 让 public/games/memory-match/index.html 随构建产物上线。
-- ============================================================

-- 1) 清理重复项
DELETE FROM games WHERE slug = '' OR slug = 'memory-test';

-- 2) 插入合并后的 canonical 记忆游戏
INSERT INTO games (
  slug, title, title_zh, emoji, description, description_zh,
  category, ai_model, ai_model_zh, plays, rating, featured,
  tags, html_content, prompt, created_at, updated_at
) VALUES (
  'memory-match',
  'Memory Match',
  '记忆力小游戏',
  '🧩',
  'Flip and match glowing cards to train your memory. Start with a simple 6-pair grid and climb to a 12-pair challenge — every round is freshly shuffled. Track your best time per difficulty.',
  '翻牌配对，锻炼你的记忆力。从简单的 6 对卡片开始，挑战 12 对的复杂布局——每一局都重新洗牌。按难度记录你的最佳时间。',
  'puzzle',
  'DeepSeek',
  'DeepSeek',
  0,
  4.6,
  1,
  '["Memory","Cards","Brain Teaser"]',
  '',
  '',
  datetime('now'),
  datetime('now')
);
