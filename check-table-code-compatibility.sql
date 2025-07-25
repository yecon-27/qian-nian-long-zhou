-- 检查表和代码的兼容性

-- 1. 检查表结构是否完整
DESC longzhou_team;
DESC longzhou_vote_record;

-- 2. 检查数据是否正确插入
SELECT COUNT(*) as '队伍总数' FROM longzhou_team;
SELECT team_id, team_name, votes FROM longzhou_team ORDER BY team_id LIMIT 5;

-- 3. 检查主键是否正常
SELECT MAX(team_id) as '最大队伍ID' FROM longzhou_team;
SELECT MIN(team_id) as '最小队伍ID' FROM longzhou_team;

-- 4. 测试插入新记录（检查自增是否正常）
-- INSERT INTO longzhou_team (team_name, team_author, votes) VALUES ('测试队伍', '测试作者', 100);
-- SELECT * FROM longzhou_team WHERE team_name = '测试队伍';

-- 5. 如果有问题，可以重置自增ID
-- ALTER TABLE longzhou_team AUTO_INCREMENT = 21;
