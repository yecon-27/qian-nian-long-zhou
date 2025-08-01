-- 创建龙舟队伍（作品）表 - 已清理likes相关字段
CREATE TABLE IF NOT EXISTS `longzhou_team` (
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '队伍ID',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `team_description` text COMMENT '队伍描述',
  `team_leader` varchar(50) DEFAULT NULL COMMENT '队长姓名',
  `team_image` varchar(500) DEFAULT NULL COMMENT '队伍图片',
  `activity_id` bigint(20) DEFAULT 1 COMMENT '活动ID',
  `total_votes` bigint(20) DEFAULT '0' COMMENT '总票数',
  `today_votes` bigint(20) DEFAULT '0' COMMENT '今日票数',
  `total_views` bigint(20) DEFAULT '0' COMMENT '总浏览次数',
  `today_views` bigint(20) DEFAULT '0' COMMENT '今日浏览次数',
  `ranking` int(11) DEFAULT '0' COMMENT '当前排名',
  `display_order` int(11) DEFAULT '0' COMMENT '显示顺序',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`team_id`),
  KEY `idx_team_name` (`team_name`),
  KEY `idx_total_votes` (`total_votes` DESC),
  KEY `idx_status` (`status`),
  KEY `idx_activity` (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟队伍（作品）表';

-- 创建浏览记录表 - 与系统表结构保持一致
CREATE TABLE IF NOT EXISTS `longzhou_view_record` (
  `view_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '浏览记录ID',
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID（游客为NULL）',
  `user_ip` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `view_date` date NOT NULL COMMENT '浏览日期',
  `view_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '浏览时间',
  `page_type` varchar(20) DEFAULT 'detail' COMMENT '页面类型',
  `user_agent` varchar(500) DEFAULT NULL COMMENT '用户代理',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`view_id`),
  KEY `idx_team_date` (`team_id`, `view_date`),
  KEY `idx_user_date` (`user_id`, `view_date`),
  KEY `idx_view_date` (`view_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='浏览记录表';

-- 创建存储过程：记录浏览行为
DELIMITER $$

DROP PROCEDURE IF EXISTS `sp_record_view`$$

CREATE PROCEDURE `sp_record_view`(
    IN p_team_id BIGINT,
    IN p_user_id BIGINT,
    IN p_user_ip VARCHAR(50),
    IN p_page_type VARCHAR(20),
    IN p_user_agent VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- 插入浏览记录 - 使用正确的表名和字段
    INSERT INTO longzhou_view_record (team_id, user_id, user_ip, view_date, view_time, page_type, user_agent)
    VALUES (p_team_id, p_user_id, p_user_ip, CURDATE(), NOW(), IFNULL(p_page_type, 'detail'), p_user_agent);
    
    -- 更新队伍浏览次数
    UPDATE longzhou_team 
    SET total_views = total_views + 1,
        today_views = today_views + 1,
        update_time = NOW()
    WHERE team_id = p_team_id;
    
    COMMIT;
END$$

DELIMITER ;

-- 插入测试数据 - 已更新字段名匹配新表结构
INSERT INTO `longzhou_team` (`team_name`, `team_description`, `team_leader`, `total_votes`, `total_views`, `status`) VALUES
('龙腾四海队', '我们是一支充满活力的龙舟队伍，致力于传承中华传统文化，展现团队协作精神。', '张三', 156, 89, '0'),
('凤舞九天队', '凤舞九天，展翅高飞！我们用激情和汗水诠释龙舟精神，追求卓越，永不言败。', '李四', 234, 156, '0'),
('波涛勇士队', '乘风破浪，勇往直前！我们是来自海边的勇士，用坚韧不拔的意志征服每一道波浪。', '王五', 189, 123, '0'),
('江南水乡队', '江南水乡，诗情画意。我们将江南的温婉与龙舟的激情完美融合，展现独特魅力。', '赵六', 298, 201, '0'),
('北国雄风队', '北国雄风，豪情万丈！我们来自北方，用粗犷豪放的性格诠释龙舟运动的魅力。', '孙七', 167, 98, '0');

-- 为系统菜单表添加龙舟队伍管理菜单（可选）
-- INSERT INTO sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark) 
-- VALUES ('龙舟队伍管理', 1, 6, 'team', 'system/team/index', 1, 0, 'C', '0', '0', 'longzhou:team:list', 'peoples', 'admin', NOW(), '', NULL, '龙舟队伍管理菜单');