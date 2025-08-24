-- 创建每日重置today_votes的定时任务
CREATE EVENT IF NOT EXISTS reset_today_votes
ON SCHEDULE EVERY 1 DAY
STARTS '2025-07-30 00:00:00'
DO
  UPDATE longzhou_team SET today_votes = 0, today_views = 0;