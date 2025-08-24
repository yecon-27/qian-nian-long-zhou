-- 将所有今日投票记录设置为昨天
UPDATE longzhou_vote_record 
SET vote_date = DATE_SUB(CURDATE(), INTERVAL 6 DAY),
    vote_time = DATE_SUB(vote_time, INTERVAL 6 DAY)
WHERE DATE(vote_time) = CURDATE() AND vote_status = '0';