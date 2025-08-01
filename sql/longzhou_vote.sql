-- 创建龙舟投票记录表
CREATE TABLE IF NOT EXISTS `longzhou_vote_record` (
  `vote_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '投票记录ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `vote_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `vote_status` char(1) DEFAULT '0' COMMENT '投票状态（0有效 1无效/已取消）',
  `cancel_time` datetime DEFAULT NULL COMMENT '取消时间',
  PRIMARY KEY (`vote_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_team_id` (`team_id`),
  KEY `idx_vote_time` (`vote_time`),
  KEY `idx_vote_status` (`vote_status`),
  KEY `idx_user_team` (`user_id`, `team_id`, `vote_status`),
  CONSTRAINT `fk_vote_user` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vote_team` FOREIGN KEY (`team_id`) REFERENCES `longzhou_team` (`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟投票记录表';

-- 创建投票配置表
CREATE TABLE IF NOT EXISTS `longzhou_vote_config` (
  `config_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `config_key` varchar(50) NOT NULL COMMENT '配置键',
  `config_value` varchar(200) NOT NULL COMMENT '配置值',
  `config_desc` varchar(200) DEFAULT NULL COMMENT '配置描述',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`config_id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟投票配置表';

-- 插入投票配置数据
INSERT INTO `longzhou_vote_config` (`config_key`, `config_value`, `config_desc`) VALUES
('daily_vote_limit', '3', '每日投票限制次数'),
('vote_start_time', '2025-01-25 00:00:00', '投票开始时间'),
('vote_end_time', '2025-12-31 23:59:59', '投票结束时间'),
('allow_cancel_vote', '1', '是否允许取消投票（0否 1是）');

-- 创建存储过程：用户投票
DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_user_vote`$$

CREATE PROCEDURE `sp_user_vote`(
    IN p_user_id BIGINT,
    IN p_team_id BIGINT,
    IN p_ip_address VARCHAR(50),
    OUT p_result INT
)
BEGIN
    DECLARE v_daily_limit INT DEFAULT 3;
    DECLARE v_today_count INT DEFAULT 0;
    DECLARE v_existing_vote INT DEFAULT 0;
    DECLARE v_team_exists INT DEFAULT 0;
    DECLARE v_vote_start DATETIME;
    DECLARE v_vote_end DATETIME;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_result = -1; -- 系统错误
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- 获取投票配置
    SELECT config_value INTO v_daily_limit 
    FROM longzhou_vote_config 
    WHERE config_key = 'daily_vote_limit';
    
    SELECT config_value INTO v_vote_start 
    FROM longzhou_vote_config 
    WHERE config_key = 'vote_start_time';
    
    SELECT config_value INTO v_vote_end 
    FROM longzhou_vote_config 
    WHERE config_key = 'vote_end_time';
    
    -- 检查投票时间范围
    IF NOW() < v_vote_start OR NOW() > v_vote_end THEN
        SET p_result = 4; -- 不在投票时间范围内
        ROLLBACK;
        LEAVE sp_user_vote;
    END IF;
    
    -- 检查队伍是否存在且状态正常
    SELECT COUNT(*) INTO v_team_exists
    FROM longzhou_team
    WHERE team_id = p_team_id AND status = '0';
    
    IF v_team_exists = 0 THEN
        SET p_result = 3; -- 作品不存在或已停用
        ROLLBACK;
        LEAVE sp_user_vote;
    END IF;
    
    -- 检查用户今日投票次数
    SELECT COUNT(*) INTO v_today_count
    FROM longzhou_vote_record
    WHERE user_id = p_user_id
      AND vote_status = '0'
      AND DATE(vote_time) = CURDATE();
    
    IF v_today_count >= v_daily_limit THEN
        SET p_result = 1; -- 今日投票次数已达上限
        ROLLBACK;
        LEAVE sp_user_vote;
    END IF;
    
    -- 检查是否已经为该作品投过票
    SELECT COUNT(*) INTO v_existing_vote
    FROM longzhou_vote_record
    WHERE user_id = p_user_id
      AND team_id = p_team_id
      AND vote_status = '0';
    
    IF v_existing_vote > 0 THEN
        SET p_result = 2; -- 已经为该作品投过票
        ROLLBACK;
        LEAVE sp_user_vote;
    END IF;
    
    -- 插入投票记录
    INSERT INTO longzhou_vote_record (user_id, team_id, vote_time, ip_address, vote_status)
    VALUES (p_user_id, p_team_id, NOW(), p_ip_address, '0');
    
    -- 更新队伍票数
    UPDATE longzhou_team 
    SET total_votes = total_votes + 1,
        update_time = NOW()
    WHERE team_id = p_team_id;
    
    SET p_result = 0; -- 投票成功
    COMMIT;
END$$

DELIMITER ;

-- 创建存储过程：获取用户投票统计
DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_get_user_vote_stats`$$

CREATE PROCEDURE `sp_get_user_vote_stats`(
    IN p_user_id BIGINT
)
BEGIN
    DECLARE v_daily_limit INT DEFAULT 3;
    
    -- 获取每日投票限制
    SELECT config_value INTO v_daily_limit 
    FROM longzhou_vote_config 
    WHERE config_key = 'daily_vote_limit';
    
    -- 返回用户投票统计信息
    SELECT 
        COALESCE(COUNT(*), 0) as today_vote_count,
        v_daily_limit as daily_vote_limit,
        (v_daily_limit - COALESCE(COUNT(*), 0)) as remaining_votes
    FROM longzhou_vote_record
    WHERE user_id = p_user_id
      AND vote_status = '0'
      AND DATE(vote_time) = CURDATE();
      
    -- 返回今日已投票的作品信息
    SELECT 
        v.team_id,
        t.team_name,
        v.vote_time
    FROM longzhou_vote_record v
    LEFT JOIN longzhou_team t ON v.team_id = t.team_id
    WHERE v.user_id = p_user_id
      AND v.vote_status = '0'
      AND DATE(v.vote_time) = CURDATE()
    ORDER BY v.vote_time DESC;
END$$

DELIMITER ;

-- 创建触发器：防止重复投票
DELIMITER $$

DROP TRIGGER IF EXISTS `tr_prevent_duplicate_vote`$$

CREATE TRIGGER `tr_prevent_duplicate_vote`
BEFORE INSERT ON `longzhou_vote_record`
FOR EACH ROW
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
    -- 检查是否存在有效的投票记录
    SELECT COUNT(*) INTO v_count
    FROM longzhou_vote_record
    WHERE user_id = NEW.user_id
      AND team_id = NEW.team_id
      AND vote_status = '0';
    
    IF v_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '用户已经为该作品投过票';
    END IF;
END$$

DELIMITER ;

-- 创建索引优化查询性能
CREATE INDEX idx_vote_user_team_status ON longzhou_vote_record(user_id, team_id, vote_status);
CREATE INDEX idx_vote_time_status ON longzhou_vote_record(vote_time, vote_status);
CREATE INDEX idx_team_status ON longzhou_team(status);

-- 插入测试投票数据（可选）
-- INSERT INTO `longzhou_vote_record` (`user_id`, `team_id`, `vote_time`, `ip_address`, `vote_status`) VALUES
-- (1, 1, '2025-01-25 10:30:00', '192.168.1.100', '0'),
-- (1, 2, '2025-01-25 11:00:00', '192.168.1.100', '0'),
-- (2, 1, '2025-01-25 14:20:00', '192.168.1.101', '0'),
-- (2, 3, '2025-01-25 15:45:00', '192.168.1.101', '0'),
-- (3, 2, '2025-01-25 16:10:00', '192.168.1.102', '0');

-- 为系统菜单表添加投票管理菜单（可选）
-- INSERT INTO sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark) 
-- VALUES ('投票管理', 1, 7, 'vote', 'system/vote/index', 1, 0, 'C', '0', '0', 'longzhou:vote:list', 'star', 'admin', NOW(), '', NULL, '投票管理菜单');

-- 添加投票相关权限
-- INSERT INTO sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark) 
-- VALUES 
-- ('投票查询', (SELECT menu_id FROM sys_menu WHERE perms = 'longzhou:vote:list'), 1, '', '', 1, 0, 'F', '0', '0', 'longzhou:vote:query', '#', 'admin', NOW(), '', NULL, ''),
-- ('投票新增', (SELECT menu_id FROM sys_menu WHERE perms = 'longzhou:vote:list'), 2, '', '', 1, 0, 'F', '0', '0', 'longzhou:vote:add', '#', 'admin', NOW(), '', NULL, ''),
-- ('投票删除', (SELECT menu_id FROM sys_menu WHERE perms = 'longzhou:vote:list'), 3, '', '', 1, 0, 'F', '0', '0', 'longzhou:vote:remove', '#', 'admin', NOW(), '', NULL, '');