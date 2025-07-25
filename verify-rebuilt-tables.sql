-- 验证重建表后的状态

-- 1. 检查表结构是否正确
DESC longzhou_team;
DESC longzhou_vote_record;

-- 2. 检查数据数量
SELECT COUNT(*) as '队伍总数' FROM longzhou_team;
SELECT COUNT(*) as '投票记录数' FROM longzhou_vote_record;

-- 3. 检查前5个队伍的ID和名称
SELECT team_id, team_name, votes, create_time FROM longzhou_team ORDER BY team_id LIMIT 5;

-- 4. 检查队伍ID范围
SELECT MIN(team_id) as '最小ID', MAX(team_id) as '最大ID' FROM longzhou_team;

-- 5. 如果之前有投票记录，检查是否需要重新关联
-- (通常重建表后投票记录表是空的，这是正常的)
