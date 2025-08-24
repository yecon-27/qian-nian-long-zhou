-- 重置所有投票数据
USE `ry-vue`;

-- 1. 显示重置前的数据状态
SELECT '=== 重置前的数据状态 ===' as info;
SELECT 'longzhou_team 投票数据:' as table_name;
SELECT team_id, team_name, total_votes FROM longzhou_team ORDER BY team_id;

SELECT 'longzhou_vote_record 记录数据:' as table_name;
SELECT COUNT(*) as total_records FROM longzhou_vote_record;
SELECT vote_id, user_id, team_id, vote_date, vote_time FROM longzhou_vote_record ORDER BY vote_time DESC LIMIT 5;

-- 2. 清空所有投票记录
SELECT '=== 开始清理投票记录 ===' as info;
DELETE FROM longzhou_vote_record;
SELECT '✅ 投票记录已清空' as result;

-- 3. 重置所有队伍的投票数为0
SELECT '=== 开始重置队伍投票数 ===' as info;
UPDATE longzhou_team SET total_votes = 0;
SELECT '✅ 队伍投票数已重置为0' as result;

-- 4. 显示重置后的数据状态
SELECT '=== 重置后的数据状态 ===' as info;
SELECT 'longzhou_team 投票数据:' as table_name;
SELECT team_id, team_name, total_votes FROM longzhou_team ORDER BY team_id;

SELECT 'longzhou_vote_record 记录数据:' as table_name;
SELECT COUNT(*) as total_records FROM longzhou_vote_record;

-- 5. 重置AUTO_INCREMENT（可选，让投票记录ID从1开始）
ALTER TABLE longzhou_vote_record AUTO_INCREMENT = 1;
SELECT '✅ 投票记录ID已重置，下次插入将从1开始' as result;

SELECT '🎉 所有投票数据重置完成！' as final_result;