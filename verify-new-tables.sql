-- =============================================
-- 龙舟投票系统新表结构验证脚本
-- 用途: 验证新创建的表结构和数据完整性
-- =============================================

-- 1. 检查表是否存在
SELECT 
  TABLE_NAME,
  TABLE_COMMENT,
  ENGINE,
  TABLE_ROWS
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME IN (
    'longzhou_vote_record',
    'longzhou_activity_config', 
    'longzhou_work',
    'longzhou_view_record'
  )
ORDER BY TABLE_NAME;

-- 2. 检查表结构
DESCRIBE longzhou_vote_record;
DESCRIBE longzhou_activity_config;
DESCRIBE longzhou_work;
DESCRIBE longzhou_view_record;

-- 3. 检查索引
SELECT 
  TABLE_NAME,
  INDEX_NAME,
  COLUMN_NAME,
  NON_UNIQUE
FROM INFORMATION_SCHEMA.STATISTICS 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME IN (
    'longzhou_vote_record',
    'longzhou_activity_config', 
    'longzhou_work',
    'longzhou_view_record'
  )
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- 4. 检查视图
SELECT 
  TABLE_NAME,
  VIEW_DEFINITION
FROM INFORMATION_SCHEMA.VIEWS 
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('v_work_ranking', 'v_user_daily_votes');

-- 5. 检查存储过程
SELECT 
  ROUTINE_NAME,
  ROUTINE_TYPE,
  ROUTINE_COMMENT
FROM INFORMATION_SCHEMA.ROUTINES 
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_NAME IN (
    'sp_check_user_vote_permission',
    'sp_user_vote',
    'sp_record_view',
    'sp_daily_reset'
  );

-- 6. 测试数据验证
-- 检查活动配置数据
SELECT 
  config_id,
  activity_name,
  start_time,
  end_time,
  daily_vote_limit,
  status
FROM longzhou_activity_config;

-- 检查作品数据
SELECT 
  work_id,
  work_title,
  work_author,
  total_votes,
  total_views,
  status
FROM longzhou_work 
ORDER BY total_votes DESC 
LIMIT 10;

-- 7. 测试存储过程
-- 测试投票权限检查
CALL sp_check_user_vote_permission('test_user_001', 1, @can_vote, @message);
SELECT @can_vote as can_vote, @message as message;

-- 8. 测试视图
-- 查看排行榜
SELECT * FROM v_work_ranking LIMIT 5;

-- 9. 数据完整性检查
-- 检查是否有孤立的投票记录
SELECT COUNT(*) as orphan_votes
FROM longzhou_vote_record vr
LEFT JOIN longzhou_work w ON vr.team_id = w.work_id
WHERE w.work_id IS NULL;

-- 检查是否有孤立的浏览记录
SELECT COUNT(*) as orphan_views
FROM longzhou_view_record vwr
LEFT JOIN longzhou_work w ON vwr.work_id = w.work_id
WHERE w.work_id IS NULL;

-- 10. 性能测试查询
-- 模拟常用查询的性能
EXPLAIN SELECT * FROM longzhou_work WHERE activity_id = 1 AND status = 1;
EXPLAIN SELECT * FROM longzhou_vote_record WHERE user_id = 'test_user' AND vote_date = CURDATE();
EXPLAIN SELECT * FROM v_work_ranking LIMIT 10;

-- 11. 约束检查
-- 检查唯一约束是否生效
SELECT 
  CONSTRAINT_NAME,
  CONSTRAINT_TYPE,
  TABLE_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME IN (
    'longzhou_vote_record',
    'longzhou_activity_config', 
    'longzhou_work',
    'longzhou_view_record'
  );

-- 12. 字符集检查
SELECT 
  TABLE_NAME,
  TABLE_COLLATION
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME IN (
    'longzhou_vote_record',
    'longzhou_activity_config', 
    'longzhou_work',
    'longzhou_view_record'
  );

-- =============================================
-- 测试数据插入 (可选)
-- =============================================

-- 插入测试投票记录
INSERT IGNORE INTO longzhou_vote_record (user_id, team_id, vote_date, user_ip) 
VALUES 
('test_user_001', 1, CURDATE(), '192.168.1.100'),
('test_user_002', 1, CURDATE(), '192.168.1.101'),
('test_user_001', 2, CURDATE(), '192.168.1.100');

-- 插入测试浏览记录
CALL sp_record_view(1, 'test_user_001', '192.168.1.100', 'detail', 'Mozilla/5.0 Test Browser');
CALL sp_record_view(2, 'test_user_002', '192.168.1.101', 'detail', 'Mozilla/5.0 Test Browser');

-- 验证测试数据
SELECT 'Vote Records' as test_type, COUNT(*) as count FROM longzhou_vote_record WHERE user_id LIKE 'test_user_%'
UNION ALL
SELECT 'View Records' as test_type, COUNT(*) as count FROM longzhou_view_record WHERE user_id LIKE 'test_user_%';

-- =============================================
-- 清理测试数据 (可选)
-- =============================================

-- 清理测试投票记录
-- DELETE FROM longzhou_vote_record WHERE user_id LIKE 'test_user_%';

-- 清理测试浏览记录  
-- DELETE FROM longzhou_view_record WHERE user_id LIKE 'test_user_%';

-- 重置作品统计数据
-- UPDATE longzhou_work SET today_votes = 0, today_views = 0 WHERE work_id IN (1, 2);

SELECT '数据库验证完成' as status;