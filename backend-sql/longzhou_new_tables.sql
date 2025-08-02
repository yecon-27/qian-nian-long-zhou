-- =============================================
-- 龙舟投票系统 - 新表结构设计
-- 创建时间: 2025-07-24
-- 说明: 包含投票记录、活动配置、作品信息、浏览记录四张核心表
-- =============================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. 投票记录表 (重新设计，支持每日3次投票限制，关联RuoYi用户系统)
DROP TABLE IF EXISTS `longzhou_vote_record`;
CREATE TABLE `longzhou_vote_record` (
  `vote_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '投票记录ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID(关联sys_user.user_id)',
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `vote_date` date NOT NULL COMMENT '投票日期',
  `vote_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  `user_ip` varchar(50) DEFAULT NULL COMMENT '用户IP地址',
  `user_agent` varchar(500) DEFAULT NULL COMMENT '用户代理信息',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态(1:有效 0:无效)',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`vote_id`),
  UNIQUE KEY `uk_user_team_date` (`user_id`, `team_id`, `vote_date`),
  KEY `idx_user_date` (`user_id`, `vote_date`),
  KEY `idx_team_date` (`team_id`, `vote_date`),
  KEY `idx_vote_date` (`vote_date`),
  CONSTRAINT `fk_vote_user` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='投票记录表-每日每用户每队伍限投1次';

-- 2. 图片资源
DROP TABLE IF EXISTS `longzhou_image_resources`;
CREATE TABLE `longzhou_image_resources`  (
  `resource_id` bigint NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `resource_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源名称',
  `resource_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '资源键值（用于前端调用）',
  `file_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文件名',
  `file_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '后端文件路径',
  `file_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '访问URL路径',
  `file_size` bigint NULL DEFAULT NULL COMMENT '文件大小（字节）',
  `file_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型（png/jpg/svg等）',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类（首页/投票/排行榜/规则/详情）',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `sort_order` int NULL DEFAULT 0 COMMENT '显示顺序',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`resource_id`) USING BTREE,
  UNIQUE INDEX `uk_resource_key`(`resource_key` ASC) USING BTREE,
  INDEX `idx_category`(`category` ASC) USING BTREE,
  INDEX `idx_status`(`status` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 89 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '龙舟活动图片资源表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of longzhou_image_resources
-- ----------------------------
INSERT INTO `longzhou_image_resources` VALUES (62, '主办单位标识', 'home_organizer', '主办单位：瑞安市文化和广电旅游体育局.png', '/static/image/longzhou/首页/主办单位：瑞安市文化和广电旅游体育局.png', '/image/longzhou/首页/主办单位：瑞安市文化和广电旅游体育局.png', NULL, 'png', 'home', '主办单位标识图片', '0', 1, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (63, '主标题', 'home_main_title', '主标题.png', '/static/image/longzhou/首页/主标题.png', '/image/longzhou/首页/主标题.png', NULL, 'png', 'home', '活动主标题图片', '0', 2, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (64, '主视觉', 'home_main_visual', '主视觉.png', '/static/image/longzhou/首页/主视觉.png', '/image/longzhou/首页/主视觉.png', NULL, 'png', 'home', '主视觉图片', '0', 3, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (65, '我要投票按钮', 'home_vote_button', '我要投票.png', '/static/image/longzhou/首页/我要投票.png', '/image/longzhou/首页/我要投票.png', NULL, 'png', 'home', '投票按钮图片', '0', 4, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (66, '打板图标', 'home_clapper', '打板.png', '/static/image/longzhou/首页/打板.png', '/image/longzhou/首页/打板.png', NULL, 'png', 'home', '打板图标', '0', 5, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (67, '首页背景', 'home_background', '首页背景.jpg', '/static/image/longzhou/首页/首页背景.jpg', '/image/longzhou/首页/首页背景.jpg', NULL, 'jpg', 'home', '首页背景图片', '0', 6, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (68, '排行图标', 'ranking_icon', '排行.png', '/static/image/longzhou/首页/排行.png', '/image/longzhou/首页/排行.png', NULL, 'png', 'common', '排行榜图标（多页面通用）', '0', 10, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (69, '规则图标', 'rules_icon', '规则.png', '/static/image/longzhou/首页/规则.png', '/image/longzhou/首页/规则.png', NULL, 'png', 'common', '规则图标（多页面通用）', '0', 11, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (70, '活动宣传图', 'activity_banner', '千年龙舟创意新生：为隆隆龙创意短视频打call.jpg', '/static/image/longzhou/投票/千年龙舟创意新生：为隆隆龙创意短视频打call.jpg', '/image/longzhou/投票/千年龙舟创意新生：为隆隆龙创意短视频打call.jpg', NULL, 'jpg', 'common', '活动宣传横幅（多页面通用）', '0', 12, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (71, '活动内页背景', 'activity_inner_bg', '千年龙舟创意新生内页.png', '/static/image/longzhou/排行榜/千年龙舟创意新生内页.png', '/image/longzhou/排行榜/千年龙舟创意新生内页.png', NULL, 'png', 'common', '活动内页背景（多页面通用）', '0', 13, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (72, '龙舟队伍配图', 'team_image', '龙舟队伍配图.jpg', '/static/image/longzhou/投票/龙舟队伍配图.jpg', '/image/longzhou/投票/龙舟队伍配图.jpg', NULL, 'jpg', 'common', '龙舟队伍默认配图', '0', 14, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (73, '提交按钮-不可选', 'vote_submit_disabled', '提交（不可选状态）.png', '/static/image/longzhou/投票/提交（不可选状态）.png', '/image/longzhou/投票/提交（不可选状态）.png', NULL, 'png', 'vote', '提交按钮不可选状态', '0', 20, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (74, '提交按钮-可选', 'vote_submit_enabled', '提交（可选状态）.png', '/static/image/longzhou/投票/提交（可选状态）.png', '/image/longzhou/投票/提交（可选状态）.png', NULL, 'png', 'vote', '提交按钮可选状态', '0', 21, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (75, '搜索图标', 'search_icon', '搜索引擎（放大镜）.png', '/static/image/longzhou/投票/搜索引擎（放大镜）.png', '/image/longzhou/投票/搜索引擎（放大镜）.png', NULL, 'png', 'vote', '搜索放大镜图标', '0', 22, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (76, '点赞-已选中', 'like_selected', '点赞（已选中状态）.png', '/static/image/longzhou/投票/点赞（已选中状态）.png', '/image/longzhou/投票/点赞（已选中状态）.png', NULL, 'png', 'vote', '点赞已选中状态', '0', 23, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (77, '点赞-未选中', 'like_unselected', '点赞（未选中状态）.png', '/static/image/longzhou/投票/点赞（未选中状态）.png', '/image/longzhou/投票/点赞（未选中状态）.png', NULL, 'png', 'vote', '点赞未选中状态', '0', 24, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (78, '排名序号星星', 'ranking_star', '排名序号星星.png', '/static/image/longzhou/排行榜/排名序号星星.png', '/image/longzhou/排行榜/排名序号星星.png', NULL, 'png', 'ranking', '排名序号星星装饰', '0', 30, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (79, '排行榜标题', 'ranking_title', '排行榜标题.png', '/static/image/longzhou/排行榜/排行榜标题.png', '/image/longzhou/排行榜/排行榜标题.png', NULL, 'png', 'ranking', '排行榜页面标题', '0', 31, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (80, '票数详细信息', 'vote_detail_info', '票数后的详细信息.png', '/static/image/longzhou/排行榜/票数后的详细信息.png', '/image/longzhou/排行榜/票数后的详细信息.png', NULL, 'png', 'ranking', '票数后的详细信息图标', '0', 32, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (81, '第一名奖牌', 'first_place', '第一名.png', '/static/image/longzhou/排行榜/第一名.png', '/image/longzhou/排行榜/第一名.png', NULL, 'png', 'ranking', '第一名奖牌', '0', 33, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (82, '第二名奖牌', 'second_place', '第二名.png', '/static/image/longzhou/排行榜/第二名.png', '/image/longzhou/排行榜/第二名.png', NULL, 'png', 'ranking', '第二名奖牌', '0', 34, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (83, '第三名奖牌', 'third_place', '第三名.png', '/static/image/longzhou/排行榜/第三名.png', '/image/longzhou/排行榜/第三名.png', NULL, 'png', 'ranking', '第三名奖牌', '0', 35, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (84, '规则详情图', 'rule_detail', 'rule.png', '/static/image/longzhou/规则/rule.png', '/image/longzhou/规则/rule.png', NULL, 'png', 'rules', '规则详情图片', '0', 40, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (85, '投票规则图', 'vote_rules', '投票规则.png', '/static/image/longzhou/规则/投票规则.png', '/image/longzhou/规则/投票规则.png', NULL, 'png', 'rules', '投票规则说明图', '0', 41, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (86, '点赞按钮', 'detail_like_button', '为TA点赞按钮.png', '/static/image/longzhou/详情/为TA点赞按钮.png', '/image/longzhou/详情/为TA点赞按钮.png', NULL, 'png', 'detail', '详情页点赞按钮', '0', 50, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (87, '已点赞状态', 'detail_liked', '已点赞.jpg', '/static/image/longzhou/详情/已点赞.jpg', '/image/longzhou/详情/已点赞.jpg', NULL, 'jpg', 'detail', '详情页已点赞状态', '0', 51, '', '2025-08-01 16:43:41', '', NULL);
INSERT INTO `longzhou_image_resources` VALUES (88, '返回按钮', 'back_button', '返回按钮.png', '/static/image/longzhou/详情/返回按钮.png', '/image/longzhou/详情/返回按钮.png', NULL, 'png', 'detail', '返回按钮', '0', 52, '', '2025-08-01 16:43:41', '', NULL);

-- 3. 龙舟队伍信息表 (简化设计，专注于队伍基本信息)
DROP TABLE IF EXISTS `longzhou_team`;
CREATE TABLE `longzhou_team` (
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '队伍ID',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `team_leader` varchar(50) NOT NULL COMMENT '队长/负责人',
  `team_description` text COMMENT '队伍描述',
  `team_image` varchar(500) DEFAULT NULL COMMENT '队伍主图',
  `activity_id` bigint(20) DEFAULT NULL COMMENT '所属活动ID',
  `total_votes` bigint(20) DEFAULT 0 COMMENT '总投票数',
  `today_votes` bigint(20) DEFAULT 0 COMMENT '今日投票数',
  `total_views` bigint(20) DEFAULT 0 COMMENT '总浏览数',
  `today_views` bigint(20) DEFAULT 0 COMMENT '今日浏览数',
  `ranking` int(11) DEFAULT 0 COMMENT '当前排名',
  `display_order` int(11) DEFAULT 0 COMMENT '显示顺序',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态(1:正常 2:隐藏 0:删除)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`team_id`),
  KEY `idx_activity_status` (`activity_id`, `status`),
  KEY `idx_votes_ranking` (`total_votes`, `ranking`),
  KEY `idx_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟队伍信息表';

-- 4. 浏览记录表 (记录用户浏览行为，用于统计和分析)
DROP TABLE IF EXISTS `longzhou_view_record`;
CREATE TABLE `longzhou_view_record` (
  `view_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '浏览记录ID',
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID(关联sys_user.user_id，游客为NULL)',
  `user_ip` varchar(50) DEFAULT NULL COMMENT '用户IP',
  `view_date` date NOT NULL COMMENT '浏览日期',
  `view_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '浏览时间',
  `view_duration` int(11) DEFAULT 0 COMMENT '浏览时长(秒)',
  `page_type` varchar(20) DEFAULT 'detail' COMMENT '页面类型(list:列表页 detail:详情页)',
  `referrer` varchar(500) DEFAULT NULL COMMENT '来源页面',
  `user_agent` varchar(500) DEFAULT NULL COMMENT '用户代理',
  `device_type` varchar(20) DEFAULT NULL COMMENT '设备类型(mobile/desktop/tablet)',
  `browser_type` varchar(50) DEFAULT NULL COMMENT '浏览器类型',
  `session_id` varchar(100) DEFAULT NULL COMMENT '会话ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`view_id`),
  KEY `idx_team_date` (`team_id`, `view_date`),
  KEY `idx_user_date` (`user_id`, `view_date`),
  KEY `idx_view_date` (`view_date`),
  KEY `idx_ip_date` (`user_ip`, `view_date`),
  CONSTRAINT `fk_view_user` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`user_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_view_team` FOREIGN KEY (`team_id`) REFERENCES `longzhou_team` (`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='浏览记录表';

-- =============================================
-- 初始化数据
-- =============================================

-- 插入默认活动配置
INSERT INTO `longzhou_activity_config` (
  `activity_name`, `activity_title`, `activity_desc`, 
  `start_time`, `end_time`, `vote_start_time`, `vote_end_time`,
  `daily_vote_limit`, `max_teams_per_vote`, 
  `activity_rules`, `contact_info`, `status`
) VALUES (
  '千年龙舟创意新生', 
  '千年龙舟创意新生 - 龙舟文化作品征集活动',
  '传承千年龙舟文化，展现创意新生力量。邀请广大创作者以龙舟文化为主题，创作优秀作品，共同弘扬中华传统文化。',
  '2025-07-01 00:00:00',
  '2025-08-31 23:59:59',
  '2025-07-15 00:00:00',
  '2025-08-25 23:59:59',
  3, 3,
  '1. 每人每天最多可投票3次\n2. 每次最多可选择3个作品\n3. 投票时间：7月15日-8月25日\n4. 严禁刷票等作弊行为',
  '联系邮箱：longzhou@example.com',
  1
);

-- 插入队伍数据 (浏览数和投票数从0开始，确保数据真实性)
INSERT INTO `longzhou_team` (
  `team_name`, `team_leader`, `team_description`, 
  `total_votes`, `total_views`, `activity_id`, `status`
) VALUES
('千年龙舟韵', '魏永明', '千年龙舟文化传承至今，展现了中华民族深厚的文化底蕴。每一桨都承载着历史的记忆，每一声呐喊都诉说着民族的精神。这不仅是一项体育竞技，更是文化的传承与发扬。', 0, 0, 1, 1),
('龙舟竞渡', '李华', '龙舟竞渡是端午节的传统项目，体现了团队合作的力量。队员们齐心协力，步调一致，在水上展现出完美的协调性。这项运动不仅锻炼身体，更培养了团队精神和拼搏意识。', 0, 0, 1, 1),
('水上飞龙', '张三', '龙舟在水面上飞速前行，如同蛟龙入海，威猛无比。这项运动结合了力量、速度和技巧，展现了运动员们的精湛技艺。每一次划桨都是对极限的挑战，每一次冲刺都是对胜利的渴望。', 0, 0, 1, 1),
('传统龙舟', '王五', '传统龙舟保持着古法制作工艺，每一艘龙舟都是匠人精心雕琢的艺术品。木质船身散发着岁月的香味，彩绘龙头栩栩如生。这是对传统文化的坚守，也是对祖先智慧的传承。', 0, 0, 1, 1),
('现代龙舟', '赵六', '现代龙舟运动融入了科技元素，在保持传统精神的同时，运用现代材料和技术提升竞技水平。这是传统与现代的完美结合，既传承了文化内涵，又适应了时代发展的需要。', 0, 0, 1, 1),
('龙舟文化', '孙七', '龙舟文化蕴含着丰富的民俗内涵，从祭祀仪式到竞技比赛，每个环节都承载着深厚的文化意义。这不仅是一项体育活动，更是民族文化的生动体现，值得我们珍视和传承。', 0, 0, 1, 1),
('端午龙舟', '周八', '端午时节，龙舟竞渡成为最受欢迎的民俗活动。粽香阵阵，鼓声震天，人们聚集在江河两岸为龙舟健儿呐喊助威。这是传统节日与体育竞技的完美融合，展现了浓厚的节日氛围。', 0, 0, 1, 1),
('民族传承', '吴九', '龙舟运动是中华民族传统文化的重要组成部分，承载着深厚的历史文化内涵。通过这项运动，我们不仅强身健体，更重要的是传承和弘扬了民族精神，让传统文化在新时代焕发出新的活力。', 0, 0, 1, 1);

-- =============================================
-- 创建视图和存储过程
-- =============================================

-- 创建队伍排行榜视图
CREATE OR REPLACE VIEW `v_team_ranking` AS
SELECT 
  t.team_id,
  t.team_name,
  t.team_leader,
  t.total_votes,
  t.total_views,
  t.today_votes,
  t.today_views,
  ROW_NUMBER() OVER (ORDER BY t.total_votes DESC, t.team_id ASC) as ranking,
  ac.activity_name
FROM longzhou_team t
LEFT JOIN longzhou_activity_config ac ON t.activity_id = ac.config_id
WHERE t.status = 1
ORDER BY t.total_votes DESC, t.team_id ASC;

-- 创建用户今日投票统计视图
CREATE OR REPLACE VIEW `v_user_daily_votes` AS
SELECT 
  vr.user_id,
  u.user_name,
  u.nick_name,
  vr.vote_date,
  COUNT(*) as vote_count,
  GROUP_CONCAT(vr.team_id) as voted_teams
FROM longzhou_vote_record vr
LEFT JOIN sys_user u ON vr.user_id = u.user_id
WHERE vr.status = 1 AND vr.vote_date = CURDATE()
GROUP BY vr.user_id, vr.vote_date;

-- 创建存储过程：检查用户是否可以投票
DELIMITER $$
CREATE PROCEDURE `sp_check_user_vote_permission`(
  IN p_user_id BIGINT,
  IN p_team_id BIGINT,
  OUT p_can_vote TINYINT,
  OUT p_message VARCHAR(200)
)
BEGIN
  DECLARE v_today_votes INT DEFAULT 0;
  DECLARE v_already_voted INT DEFAULT 0;
  DECLARE v_daily_limit INT DEFAULT 3;
  
  -- 获取活动配置的每日投票限制
  SELECT daily_vote_limit INTO v_daily_limit 
  FROM longzhou_activity_config 
  WHERE status = 1 AND NOW() BETWEEN start_time AND end_time 
  LIMIT 1;
  
  -- 检查今日已投票数
  SELECT COUNT(*) INTO v_today_votes
  FROM longzhou_vote_record 
  WHERE user_id = p_user_id AND vote_date = CURDATE() AND status = 1;
  
  -- 检查是否已对该作品投票
  SELECT COUNT(*) INTO v_already_voted
  FROM longzhou_vote_record 
  WHERE user_id = p_user_id AND team_id = p_team_id AND vote_date = CURDATE() AND status = 1;
  
  -- 判断是否可以投票
  IF v_already_voted > 0 THEN
    SET p_can_vote = 0;
    SET p_message = '您今天已经为该作品投过票了';
  ELSEIF v_today_votes >= v_daily_limit THEN
    SET p_can_vote = 0;
    SET p_message = CONCAT('您今天的投票次数已用完，每日限投', v_daily_limit, '次');
  ELSE
    SET p_can_vote = 1;
    SET p_message = '可以投票';
  END IF;
END$$
DELIMITER ;

-- 创建存储过程：用户投票
DELIMITER $$
CREATE PROCEDURE `sp_user_vote`(
  IN p_user_id BIGINT,
  IN p_team_id BIGINT,
  IN p_user_ip VARCHAR(50),
  IN p_user_agent VARCHAR(500),
  OUT p_success TINYINT,
  OUT p_message VARCHAR(200)
)
BEGIN
  DECLARE v_can_vote TINYINT DEFAULT 0;
  DECLARE v_check_message VARCHAR(200);
  
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_success = 0;
    SET p_message = '投票失败，请稍后重试';
  END;
  
  START TRANSACTION;
  
  -- 检查投票权限
  CALL sp_check_user_vote_permission(p_user_id, p_team_id, v_can_vote, v_check_message);
  
  IF v_can_vote = 1 THEN
    -- 插入投票记录
    INSERT INTO longzhou_vote_record (user_id, team_id, vote_date, user_ip, user_agent)
    VALUES (p_user_id, p_team_id, CURDATE(), p_user_ip, p_user_agent);
    
    -- 更新队伍投票数
    UPDATE longzhou_team 
    SET total_votes = total_votes + 1,
        today_votes = today_votes + 1
    WHERE team_id = p_team_id;
    
    SET p_success = 1;
    SET p_message = '投票成功';
    COMMIT;
  ELSE
    SET p_success = 0;
    SET p_message = v_check_message;
    ROLLBACK;
  END IF;
END$$
DELIMITER ;

-- 创建存储过程：记录浏览
DELIMITER $$
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
    -- 忽略错误，浏览记录失败不影响主要功能
  END;
  
  -- 插入浏览记录
  INSERT INTO longzhou_view_record (
    team_id, user_id, user_ip, view_date, page_type, user_agent
  ) VALUES (
    p_team_id, p_user_id, p_user_ip, CURDATE(), p_page_type, p_user_agent
  );
  
  -- 更新队伍浏览数
  UPDATE longzhou_team 
  SET total_views = total_views + 1,
      today_views = today_views + 1
  WHERE team_id = p_team_id;
END$$
DELIMITER ;

-- =============================================
-- 创建定时任务相关
-- =============================================

-- 创建存储过程：每日数据重置
DELIMITER $$
CREATE PROCEDURE `sp_daily_reset`()
BEGIN
  -- 重置今日投票数和浏览数
  UPDATE longzhou_team SET today_votes = 0, today_views = 0;
  
  -- 可以在这里添加其他每日重置逻辑
  -- 比如清理过期的临时数据等
END$$
DELIMITER ;

-- 注意：需要在MySQL中设置定时任务来每日执行重置
-- CREATE EVENT IF NOT EXISTS `daily_reset_event`
-- ON SCHEDULE EVERY 1 DAY STARTS '2025-07-25 00:00:01'
-- DO CALL sp_daily_reset();

SET FOREIGN_KEY_CHECKS = 1;