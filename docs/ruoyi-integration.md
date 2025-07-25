# 若依后端集成指南

## 1. 下载若依后端
```bash
# 克隆若依前后端分离版
git clone https://gitee.com/y_project/RuoYi-Vue.git

# 或下载若依管理系统
git clone https://gitee.com/y_project/RuoYi.git
```

## 2. 数据库设计 (针对龙舟投票系统)

### 核心表结构
```sql
-- 龙舟队伍表
CREATE TABLE `dragon_boat_team` (
  `team_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '队伍ID',
  `team_name` varchar(100) NOT NULL COMMENT '队伍名称',
  `team_logo` varchar(255) DEFAULT NULL COMMENT '队伍LOGO',
  `team_description` text COMMENT '队伍描述',
  `vote_count` int(11) DEFAULT 0 COMMENT '投票数',
  `like_count` int(11) DEFAULT 0 COMMENT '点赞数',
  `read_count` int(11) DEFAULT 0 COMMENT '阅读量',
  `status` char(1) DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`team_id`)
) ENGINE=InnoDB COMMENT='龙舟队伍表';

-- 用户投票记录表
CREATE TABLE `user_vote_record` (
  `record_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '记录ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `team_id` bigint(20) NOT NULL COMMENT '队伍ID',
  `vote_type` char(1) NOT NULL COMMENT '投票类型（1投票 2点赞）',
  `vote_date` date NOT NULL COMMENT '投票日期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`record_id`),
  UNIQUE KEY `uk_user_team_date` (`user_id`, `team_id`, `vote_date`, `vote_type`) COMMENT '用户每日每队伍只能投一票'
) ENGINE=InnoDB COMMENT='用户投票记录表';

-- 投票配置表
CREATE TABLE `vote_config` (
  `config_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '配置ID',
  `config_key` varchar(100) NOT NULL COMMENT '配置键',
  `config_value` varchar(500) NOT NULL COMMENT '配置值',
  `config_desc` varchar(500) DEFAULT NULL COMMENT '配置描述',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`config_id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB COMMENT='投票配置表';
```

## 3. 后端 API 接口设计

### 队伍管理接口
```java
@RestController
@RequestMapping("/api/teams")
public class DragonBoatTeamController {
    
    // 获取所有队伍列表
    @GetMapping("/list")
    public AjaxResult getTeamList() {
        // 返回队伍列表
    }
    
    // 获取队伍详情
    @GetMapping("/{teamId}")
    public AjaxResult getTeamDetail(@PathVariable Long teamId) {
        // 返回队伍详情
    }
    
    // 为队伍投票
    @PostMapping("/{teamId}/vote")
    public AjaxResult voteForTeam(@PathVariable Long teamId) {
        // 投票逻辑，检查是否已投票
    }
    
    // 为队伍点赞
    @PostMapping("/{teamId}/like")
    public AjaxResult likeTeam(@PathVariable Long teamId) {
        // 点赞逻辑
    }
    
    // 获取排行榜
    @GetMapping("/ranking")
    public AjaxResult getRanking() {
        // 返回按投票数排序的队伍列表
    }
}
```

### 用户投票接口
```java
@RestController
@RequestMapping("/api/vote")
public class VoteController {
    
    // 检查用户今日是否已投票
    @GetMapping("/check")
    public AjaxResult checkTodayVote() {
        // 检查当前用户今日投票状态
    }
    
    // 获取用户投票历史
    @GetMapping("/history")
    public AjaxResult getUserVoteHistory() {
        // 返回用户投票历史
    }
}
```

## 4. 前端项目改造要点

### 环境变量配置
```bash
# .env.development
VITE_APP_BASE_API=http://localhost:8080
VITE_ENABLE_AUTH=true
VITE_ENABLE_FALLBACK=true

# .env.production  
VITE_APP_BASE_API=/api
VITE_ENABLE_AUTH=true
VITE_ENABLE_FALLBACK=true
```

### 代码改造重点
1. **API 层**: 创建统一的请求封装和接口定义
2. **Store 改造**: 集成后端 API，保留本地回退机制
3. **认证系统**: 添加用户登录、权限管理
4. **错误处理**: 优雅的错误处理和回退机制

## 5. 部署步骤

### 后端部署 (若依)
```bash
# 1. 克隆若依项目
git clone https://gitee.com/y_project/RuoYi-Vue.git
cd RuoYi-Vue

# 2. 修改数据库配置
# 编辑 ruoyi-admin/src/main/resources/application-druid.yml
# 配置你的 MySQL 数据库连接

# 3. 执行数据库脚本
# 运行 sql/quartz.sql 和 sql/ry_20210908.sql

# 4. 添加自定义业务表
# 执行上面的龙舟相关表结构SQL

# 5. 启动后端服务
mvn clean install
java -jar ruoyi-admin/target/ruoyi-admin.jar
```

### 前端部署
```bash
# 1. 安装依赖
npm install

# 2. 开发环境运行
npm run dev

# 3. 生产环境构建
npm run build

# 4. 部署到服务器
# 将 dist 目录上传到 nginx 或其他 web 服务器
```

### Nginx 配置示例
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 前端静态文件
    location / {
        root /var/www/qian-nian-long-zhou/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API 代理到后端
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 6. 集成优势

### 1. 数据持久化
- ✅ 真正的数据库存储，不再依赖 localStorage
- ✅ 数据安全性和一致性保障
- ✅ 支持多用户并发访问

### 2. 用户管理
- ✅ 完整的用户注册、登录系统
- ✅ 权限管理和角色控制
- ✅ 防止恶意投票和刷票

### 3. 管理后台
- ✅ 队伍管理：增删改查队伍信息
- ✅ 投票监控：实时查看投票数据和统计
- ✅ 用户管理：管理用户和投票记录
- ✅ 系统配置：动态配置投票规则

### 4. 扩展性
- ✅ 支持大量用户并发访问
- ✅ 可扩展到微服务架构
- ✅ 支持负载均衡和集群部署

## 7. 迁移策略

### 渐进式迁移
1. **第一阶段**: 保持现有功能，添加后端 API 支持
2. **第二阶段**: 逐步替换 localStorage 为后端数据
3. **第三阶段**: 添加用户认证和权限管理
4. **第四阶段**: 完全切换到后端数据，移除本地回退

### 数据迁移
```typescript
// 数据迁移工具
const migrateLocalDataToBackend = async () => {
  const localData = localStorage.getItem('teams_fallback_data')
  if (localData) {
    const teams = JSON.parse(localData)
    for (const team of teams) {
      await teamApi.createOrUpdateTeam(team)
    }
  }
}
```

## 8. 监控和维护

### 性能监控
- API 响应时间监控
- 错误率统计
- 用户行为分析

### 数据备份
- 定期数据库备份
- 投票数据归档
- 日志文件管理

### 安全措施
- API 接口限流
- 防止重复投票
- 数据加密传输

## 总结

通过与若依后端的集成，您的龙舟投票系统将获得：
- 🚀 企业级的后端架构
- 🔒 完整的安全认证体系  
- 📊 强大的数据管理能力
- 🎯 优秀的扩展性和维护性

这将是一个从前端学习项目到完整企业级应用的重要升级！
