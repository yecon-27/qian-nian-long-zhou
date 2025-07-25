-- 检查龙舟相关表和数据的SQL语句

-- 1. 检查表是否存在
SHOW TABLES LIKE 'longzhou%';

-- 2. 检查龙舟队伍表数据
SELECT COUNT(*) as '队伍总数' FROM longzhou_team;
SELECT team_id, team_name, votes, likes FROM longzhou_team LIMIT 5;

-- 3. 检查投票记录表数据  
SELECT COUNT(*) as '投票记录总数' FROM longzhou_vote_record;

-- 4. 检查表结构
DESC longzhou_team;
DESC longzhou_vote_record;

-- 5. 如果表不存在或数据不对，重新执行建表和插入数据
-- 可以直接复制 longzhou_tables.sql 的内容来执行
