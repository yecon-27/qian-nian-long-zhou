# 微信小程序龙舟投票 - 若依后端适配方案

## 🎯 现状分析

✅ 若依后端完全正常运行
✅ 认证系统工作正常  
✅ 接口路径识别正确
❓ 需要为微信小程序创建无需登录的公开接口

## 📋 解决方案

### 方案 1: 创建公开 API 接口（推荐）

在若依后端创建专门的微信小程序接口，无需认证：

#### 1. 创建龙舟投票控制器

```java
@RestController
@RequestMapping("/api/public/longzhou")
public class PublicLongzhouController {

    // 获取队伍列表（无需认证）
    @GetMapping("/teams")
    public AjaxResult getTeams() {
        // 返回队伍数据
    }

    // 投票接口（基于微信openid）
    @PostMapping("/vote")
    public AjaxResult vote(@RequestParam String teamId, @RequestParam String openid) {
        // 投票逻辑
    }

    // 获取排行榜
    @GetMapping("/ranking")
    public AjaxResult getRanking() {
        // 排行榜数据
    }
}
```

#### 2. 在 SecurityConfig 中配置白名单

```java
// 在configure方法中添加
.antMatchers("/api/public/**").permitAll()
```

### 方案 2: 使用 Mock 数据快速开发（临时方案）

先使用 mock 数据完成前端开发，后续再接入真实后端：

#### 更新前端配置使用 mock 数据：

```typescript
// 在.env.development中添加
VITE_USE_MOCK = true;
```

## 🛠️ 立即可执行的步骤

### 步骤 1: 测试若依管理界面

请访问: http://localhost:8080

- 账号: admin
- 密码: admin123

如果能正常登录，说明若依配置完整。

### 步骤 2: 创建龙舟业务表

在若依管理界面中，执行以下 SQL 创建龙舟相关表：

```sql
-- 龙舟队伍表
CREATE TABLE `longzhou_team` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '队伍ID',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `team_leader` varchar(50) DEFAULT NULL COMMENT '队长姓名',
  `team_description` text COMMENT '队伍介绍',
  `team_logo` varchar(255) DEFAULT NULL COMMENT '队伍logo',
  `vote_count` bigint(20) DEFAULT '0' COMMENT '得票数',
  `status` char(1) DEFAULT '1' COMMENT '状态（1正常 0停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='龙舟队伍表';

-- 投票记录表
CREATE TABLE `longzhou_vote` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `openid` varchar(50) NOT NULL COMMENT '微信openid',
  `vote_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '投票时间',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_team_openid` (`team_id`,`openid`),
  KEY `idx_openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='投票记录表';

-- 插入示例队伍数据
INSERT INTO `longzhou_team` (`team_name`, `team_leader`, `team_description`, `team_logo`, `vote_count`) VALUES
('瑞安龙腾队', '张三', '传承千年龙舟文化，展现瑞安人民的团结精神', '/images/team1.jpg', 0),
('千年传承队', '李四', '弘扬龙舟传统文化，传承千年龙舟精神', '/images/team2.jpg', 0),
('文化创新队', '王五', '在传承中创新，在创新中发展龙舟文化', '/images/team3.jpg', 0),
('青春风采队', '赵六', '年轻的力量，传承的使命', '/images/team4.jpg', 0),
('团结奋进队', '钱七', '团结一心，奋勇向前', '/images/team5.jpg', 0);
```

### 步骤 3: 使用代码生成器

1. 登录若依管理界面
2. 进入"系统工具" -> "代码生成"
3. 导入刚创建的表
4. 生成 CRUD 代码
5. 下载并集成到项目中

### 步骤 4: 创建公开 API

修改生成的 Controller，添加无需认证的公开接口。

## 🔄 当前建议

**立即执行：**

1. 先访问 http://localhost:8080 确认能否登录管理界面
2. 如果可以登录，按上述步骤创建数据表
3. 告诉我结果，我来帮您创建具体的接口代码

**临时方案：**
如果您想先完成前端开发，我可以帮您配置使用 mock 数据，跳过后端认证问题。

请告诉我您想选择哪种方案？
