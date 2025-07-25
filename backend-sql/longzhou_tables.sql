-- 龙舟队伍表（对应您前端的teams数据）
CREATE TABLE `longzhou_team` (
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '队伍ID',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `team_author` varchar(50) DEFAULT NULL COMMENT '作者/队长',
  `team_description` text COMMENT '队伍描述',
  `team_img` varchar(255) DEFAULT NULL COMMENT '队伍图片',
  `votes` bigint(20) DEFAULT '0' COMMENT '投票数',
  `original_votes` bigint(20) DEFAULT '0' COMMENT '原始投票数',
  `likes` bigint(20) DEFAULT '0' COMMENT '点赞数',
  `read_count` bigint(20) DEFAULT '0' COMMENT '阅读数',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟队伍表';

-- 用户投票记录表
CREATE TABLE `longzhou_vote_record` (
  `vote_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `user_openid` varchar(50) DEFAULT NULL COMMENT '微信openid',
  `user_ip` varchar(50) DEFAULT NULL COMMENT '用户IP',
  `vote_date` date NOT NULL COMMENT '投票日期',
  `vote_type` char(1) DEFAULT '1' COMMENT '投票类型（1投票 2点赞）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vote_id`),
  UNIQUE KEY `uk_team_user_date` (`team_id`,`user_openid`,`vote_date`,`vote_type`),
  KEY `idx_team_id` (`team_id`),
  KEY `idx_vote_date` (`vote_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='投票记录表';

-- 插入龙舟队伍示例数据（20个队伍）
INSERT INTO `longzhou_team` (`team_name`, `team_author`, `team_description`, `votes`, `original_votes`, `likes`, `read_count`) VALUES
('千年龙舟韵', '魏永明', '千年龙舟文化传承至今，展现了中华民族深厚的文化底蕴。每一桨都承载着历史的记忆，每一声呐喊都诉说着民族的精神。', 2850, 2850, 245, 4230),
('龙舟竞渡', '李华', '龙舟竞渡是端午节的传统项目，体现了团队合作的力量。队员们齐心协力，步调一致，在水上展现出完美的协调性。', 2120, 2120, 189, 3580),
('水上飞龙', '张三', '龙舟在水面上飞速前行，如同蛟龙入海，威猛无比。这项运动结合了力量、速度和技巧，展现了运动员们的精湛技艺。', 3180, 3180, 298, 4890),
('传统龙舟', '王五', '传统龙舟保持着古法制作工艺，每一艘龙舟都是匠人精心雕琢的艺术品。木质船身散发着岁月的香味，彩绘龙头栩栩如生。', 2650, 2650, 221, 3920),
('现代龙舟', '赵六', '现代龙舟运动融入了科技元素，在保持传统精神的同时，运用现代材料和技术提升竞技水平。', 2890, 2890, 256, 4350),
('龙舟文化', '孙七', '龙舟文化蕴含着丰富的民俗内涵，从祭祀仪式到竞技比赛，每个环节都承载着深厚的文化意义。', 2340, 2340, 198, 3780),
('端午龙舟', '周八', '端午时节，龙舟竞渡成为最受欢迎的民俗活动。粽香阵阵，鼓声震天，人们聚集在江河两岸为龙舟健儿呐喊助威。', 3020, 3020, 278, 4650),
('民族传承', '吴九', '龙舟运动是中华民族传统文化的重要组成部分，承载着深厚的历史文化内涵和民族精神。', 2750, 2750, 234, 4180),
('江南水韵', '陈十', '江南水乡的龙舟运动别具一格，青石板桥、粉墙黛瓦映衬下的龙舟竞渡，展现出独特的江南韵味。', 2480, 2480, 215, 3850),
('激流勇进', '刘一一', '在湍急的水流中劈波斩浪，龙舟健儿们展现出无畏的勇气和顽强的毅力，诠释着勇往直前的精神。', 2950, 2950, 267, 4420),
('古韵新声', '马一二', '古老的龙舟文化在新时代焕发出新的活力，传统与现代的完美融合，续写着龙舟运动的新篇章。', 2380, 2380, 201, 3680),
('碧波追风', '杨一三', '龙舟在碧波荡漾的湖面上追风逐浪，桨声阵阵，激起层层浪花，如诗如画的运动画卷。', 2720, 2720, 238, 4050),
('龙腾四海', '黄一四', '龙舟运动已走向世界，中华文化的瑰宝在四海传播，让全世界感受到东方龙的威猛与魅力。', 3150, 3150, 289, 4780),
('团结奋进', '徐一五', '龙舟运动最能体现团队协作精神，队员们心往一处想，劲往一处使，共同奏响胜利的凯歌。', 2590, 2590, 224, 3950),
('劈波斩浪', '郑一六', '龙舟如利剑般劈开水面，勇敢地斩断前进路上的层层阻碍，展现出无所畏惧的拼搏精神。', 2830, 2830, 249, 4280),
('龙舟精神', '冯一七', '龙舟精神代表着中华民族自强不息、团结协作的品格，激励着一代又一代人勇敢前行。', 2680, 2680, 231, 4120),
('风雨同舟', '于一八', '无论风雨多大，队员们始终同舟共济，这种患难与共的精神正是龙舟运动的精髓所在。', 2410, 2410, 208, 3720),
('百舸争流', '袁一九', '百舸争流的壮观场面令人震撼，每一艘龙舟都承载着队员们的梦想，在激烈的竞争中展现风采。', 3080, 3080, 285, 4680),
('传承创新', '许二十', '在传承千年龙舟文化的同时，不断融入创新元素，让这项古老的运动在新时代绽放出更加绚烂的光彩。', 2920, 2920, 262, 4380),
('勇者无畏', '何二一', '真正的勇者从不畏惧挑战，龙舟健儿们以无畏的勇气面对每一次比赛，诠释着体育精神的真谛。', 2760, 2760, 241, 4200);
