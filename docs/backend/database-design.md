# 龙舟投票系统数据库设计

## 概述

本文档描述了龙舟投票系统的数据库设计，包含 4 张核心表和相关的视图、存储过程。

## 核心表结构

### 1. 投票记录表 (`longzhou_vote_record`)

**功能**: 记录用户投票行为，实现每日投票限制

| 字段名     | 类型         | 说明         | 约束                             |
| ---------- | ------------ | ------------ | -------------------------------- |
| vote_id    | bigint(20)   | 投票记录 ID  | 主键，自增                       |
| user_id    | varchar(100) | 用户标识     | 非空，可以是 openid、IP、设备 ID |
| team_id    | bigint(20)   | 队伍 ID      | 非空，关联作品表                 |
| vote_date  | date         | 投票日期     | 非空                             |
| vote_time  | datetime     | 投票时间     | 默认当前时间                     |
| user_ip    | varchar(50)  | 用户 IP 地址 | 可空                             |
| user_agent | varchar(500) | 用户代理信息 | 可空                             |
| status     | tinyint(1)   | 状态         | 1:有效 0:无效                    |

**关键约束**:

- 唯一键: `uk_user_team_date` (user_id, team_id, vote_date) - 确保每用户每天每作品只能投一票
- 索引: user_date, team_date, vote_date

**业务规则**:

- 每个用户每天最多投票 3 次
- 每个用户每天对同一作品只能投票 1 次
- 支持取消投票（将 status 设为 0）

### 2. 活动配置表 (`longzhou_activity_config`)

**功能**: 管理活动相关的所有可配置参数，避免硬编码

| 字段名             | 类型         | 说明               | 默认值     |
| ------------------ | ------------ | ------------------ | ---------- |
| config_id          | bigint(20)   | 配置 ID            | 主键，自增 |
| activity_name      | varchar(100) | 活动名称           | 非空       |
| activity_title     | varchar(200) | 活动标题           | 可空       |
| rule_image         | varchar(500) | 规则页面图片 URL   | 可空       |
| banner_image       | varchar(500) | 横幅图片 URL       | 可空       |
| start_time         | datetime     | 活动开始时间       | 非空       |
| end_time           | datetime     | 活动结束时间       | 非空       |
| vote_start_time    | datetime     | 投票开始时间       | 可空       |
| vote_end_time      | datetime     | 投票结束时间       | 可空       |
| daily_vote_limit   | int(11)      | 每日投票限制次数   | 3          |
| max_teams_per_vote | int(11)      | 每次最多可投队伍数 | 3          |
| activity_rules     | text         | 活动规则详细说明   | 可空       |
| contact_info       | varchar(200) | 联系方式           | 可空       |
| prize_info         | text         | 奖品信息           | 可空       |

**可配置内容**:

- 活动时间范围
- 投票规则（每日限制、每次限制）
- 页面图片（规则图、横幅图、背景图）
- 活动说明文字
- 联系方式和奖品信息

### 3. 作品信息表 (`longzhou_work`)

**功能**: 存储作品的详细信息，专注于作品本身

| 字段名           | 类型         | 说明             | 默认值         |
| ---------------- | ------------ | ---------------- | -------------- |
| work_id          | bigint(20)   | 作品 ID          | 主键，自增     |
| work_title       | varchar(100) | 作品标题         | 非空           |
| work_author      | varchar(50)  | 作者姓名         | 非空           |
| work_description | text         | 作品描述         | 可空           |
| work_image       | varchar(500) | 作品主图         | 可空           |
| work_images      | text         | 作品图片集(JSON) | 可空           |
| work_video       | varchar(500) | 作品视频 URL     | 可空           |
| work_category    | varchar(50)  | 作品分类         | 可空           |
| author_intro     | text         | 作者简介         | 可空           |
| creation_story   | text         | 创作故事         | 可空           |
| activity_id      | bigint(20)   | 所属活动 ID      | 关联活动配置表 |
| total_votes      | bigint(20)   | 总投票数         | 0              |
| today_votes      | bigint(20)   | 今日投票数       | 0              |
| total_views      | bigint(20)   | 总浏览数         | 0              |
| today_views      | bigint(20)   | 今日浏览数       | 0              |
| ranking          | int(11)      | 当前排名         | 0              |
| is_featured      | tinyint(1)   | 是否精选         | 0              |

**扩展字段**:

- 支持多图片（JSON 格式存储）
- 支持视频内容
- 支持作品分类和标签
- 支持作者介绍和创作故事
- 支持精选标记和排序

### 4. 浏览记录表 (`longzhou_view_record`)

**功能**: 记录用户浏览行为，用于统计分析

| 字段名        | 类型         | 说明         | 默认值     |
| ------------- | ------------ | ------------ | ---------- |
| view_id       | bigint(20)   | 浏览记录 ID  | 主键，自增 |
| work_id       | bigint(20)   | 作品 ID      | 非空       |
| user_id       | varchar(100) | 用户标识     | 可空       |
| user_ip       | varchar(50)  | 用户 IP      | 可空       |
| view_date     | date         | 浏览日期     | 非空       |
| view_time     | datetime     | 浏览时间     | 当前时间   |
| view_duration | int(11)      | 浏览时长(秒) | 0          |
| page_type     | varchar(20)  | 页面类型     | 'detail'   |
| referrer      | varchar(500) | 来源页面     | 可空       |
| device_type   | varchar(20)  | 设备类型     | 可空       |
| browser_type  | varchar(50)  | 浏览器类型   | 可空       |

**统计维度**:

- 按作品统计浏览量
- 按日期统计趋势
- 按设备类型分析
- 按来源页面分析
- 浏览时长分析

## 视图设计

### 1. 作品排行榜视图 (`v_work_ranking`)

```sql
SELECT
  w.work_id,
  w.work_title,
  w.work_author,
  w.total_votes,
  w.total_views,
  ROW_NUMBER() OVER (ORDER BY w.total_votes DESC) as ranking
FROM longzhou_work w
WHERE w.status = 1
ORDER BY w.total_votes DESC;
```

### 2. 用户今日投票统计视图 (`v_user_daily_votes`)

```sql
SELECT
  user_id,
  vote_date,
  COUNT(*) as vote_count,
  GROUP_CONCAT(team_id) as voted_teams
FROM longzhou_vote_record
WHERE status = 1 AND vote_date = CURDATE()
GROUP BY user_id, vote_date;
```

## 存储过程

### 1. 检查投票权限 (`sp_check_user_vote_permission`)

**参数**:

- IN p_user_id: 用户 ID
- IN p_team_id: 作品 ID
- OUT p_can_vote: 是否可以投票
- OUT p_message: 返回消息

**逻辑**:

1. 检查今日已投票数是否超限
2. 检查是否已对该作品投票
3. 返回检查结果和提示信息

### 2. 用户投票 (`sp_user_vote`)

**参数**:

- IN p_user_id: 用户 ID
- IN p_team_id: 作品 ID
- IN p_user_ip: 用户 IP
- IN p_user_agent: 用户代理
- OUT p_success: 是否成功
- OUT p_message: 返回消息

**逻辑**:

1. 调用权限检查
2. 插入投票记录
3. 更新作品投票数
4. 事务处理确保数据一致性

### 3. 记录浏览 (`sp_record_view`)

**参数**:

- IN p_work_id: 作品 ID
- IN p_user_id: 用户 ID
- IN p_user_ip: 用户 IP
- IN p_page_type: 页面类型
- IN p_user_agent: 用户代理

**逻辑**:

1. 插入浏览记录
2. 更新作品浏览数
3. 错误处理不影响主要功能

## 数据迁移

### 从旧表结构迁移

```sql
-- 迁移作品数据
INSERT INTO longzhou_work (
  work_title, work_author, work_description,
  total_votes, total_views, activity_id
)
SELECT
  team_name, team_author, team_description,
  votes, read_count, 1
FROM longzhou_team
WHERE status = '0';
```

## 性能优化

### 索引策略

1. **投票记录表**:

   - 复合索引: (user_id, vote_date)
   - 复合索引: (team_id, vote_date)
   - 单列索引: vote_date

2. **浏览记录表**:

   - 复合索引: (work_id, view_date)
   - 复合索引: (user_id, view_date)
   - 单列索引: view_date

3. **作品表**:
   - 复合索引: (total_votes, ranking)
   - 复合索引: (activity_id, status)

### 分区策略

对于大数据量场景，可以考虑按日期分区：

```sql
-- 投票记录表按月分区
ALTER TABLE longzhou_vote_record
PARTITION BY RANGE (TO_DAYS(vote_date)) (
  PARTITION p202507 VALUES LESS THAN (TO_DAYS('2025-08-01')),
  PARTITION p202508 VALUES LESS THAN (TO_DAYS('2025-09-01')),
  -- ...
);
```

## 定时任务

### 每日重置任务

```sql
-- 创建定时事件
CREATE EVENT daily_reset_event
ON SCHEDULE EVERY 1 DAY STARTS '2025-07-25 00:00:01'
DO CALL sp_daily_reset();
```

**重置内容**:

- 清零今日投票数
- 清零今日浏览数
- 更新排名信息
- 清理过期临时数据

## API 接口设计建议

### 1. 投票相关接口

```
POST /api/vote
- 参数: user_id, work_id, user_ip
- 返回: success, message, remaining_votes

GET /api/vote/check/{user_id}
- 返回: today_votes, remaining_votes, voted_works

DELETE /api/vote/{user_id}/{work_id}
- 功能: 取消投票
```

### 2. 作品相关接口

```
GET /api/works
- 参数: page, size, category, sort
- 返回: 作品列表

GET /api/works/{work_id}
- 返回: 作品详情
- 副作用: 记录浏览

GET /api/works/ranking
- 返回: 排行榜数据
```

### 3. 活动配置接口

```
GET /api/config/activity
- 返回: 当前活动配置

GET /api/config/rules
- 返回: 活动规则和图片
```

## 安全考虑

1. **防刷票机制**:

   - IP 限制
   - 设备指纹
   - 验证码
   - 行为分析

2. **数据保护**:

   - 敏感信息加密
   - SQL 注入防护
   - 访问权限控制

3. **性能保护**:
   - 接口限流
   - 缓存策略
   - 数据库连接池

## 监控指标

1. **业务指标**:

   - 每日投票数
   - 每日浏览数
   - 作品排名变化
   - 用户活跃度

2. **技术指标**:
   - 数据库性能
   - 接口响应时间
   - 错误率统计
   - 资源使用情况
