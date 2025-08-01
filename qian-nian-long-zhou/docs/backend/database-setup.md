# 数据库设置指南

## 数据库结构

项目使用 MySQL 数据库，相关 SQL 文件位于 `backend-sql/` 目录。

### 主要表结构

#### 1. 龙舟队伍表
```sql
-- 详见 backend-sql/longzhou_tables.sql
CREATE TABLE longzhou_teams (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100) NOT NULL,
  votes INT DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 数据库检查

### 检查脚本
项目提供了多个数据库检查脚本：

1. **数据库状态检查**
   ```sql
   -- 运行 check-database-status.sql
   SELECT 'Database connection test' as status;
   ```

2. **表结构兼容性检查**
   ```sql
   -- 运行 check-table-code-compatibility.sql
   SHOW TABLES;
   DESCRIBE longzhou_teams;
   ```

3. **表重建验证**
   ```sql
   -- 运行 verify-rebuilt-tables.sql
   SELECT COUNT(*) FROM longzhou_teams;
   ```

## 数据初始化

### 1. 创建数据库
```sql
CREATE DATABASE longzhou_voting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE longzhou_voting;
```

### 2. 导入表结构
```bash
mysql -u username -p longzhou_voting < backend-sql/longzhou_tables.sql
```

### 3. 初始化数据
```sql
-- 插入示例数据
INSERT INTO longzhou_teams (title, author, votes, description) VALUES
('千年龙舟韵', '魏永明', 1500, '千年龙舟文化传承至今...'),
('龙舟竞渡', '李华', 1200, '龙舟竞渡是端午节的传统项目...');
```

## 数据库配置

### 环境变量
```env
# .env.development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=longzhou_voting
DB_USER=your_username
DB_PASSWORD=your_password
```

### 连接配置
```javascript
// 数据库连接配置示例
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  charset: 'utf8mb4'
}
```

## 数据迁移

### 版本控制
- 使用版本号管理数据库变更
- 每次结构变更创建迁移脚本
- 保持向后兼容性

### 迁移脚本示例
```sql
-- migration_001_add_read_count.sql
ALTER TABLE longzhou_teams 
ADD COLUMN read_count INT DEFAULT 0 AFTER votes;
```

## 性能优化

### 索引优化
```sql
-- 为常用查询字段添加索引
CREATE INDEX idx_votes ON longzhou_teams(votes DESC);
CREATE INDEX idx_created_at ON longzhou_teams(created_at);
```

### 查询优化
```sql
-- 获取排行榜（优化版）
SELECT id, title, author, votes, 
       ROW_NUMBER() OVER (ORDER BY votes DESC) as rank
FROM longzhou_teams 
ORDER BY votes DESC 
LIMIT 10;
```

## 备份与恢复

### 数据备份
```bash
# 备份数据库
mysqldump -u username -p longzhou_voting > backup_$(date +%Y%m%d).sql

# 备份特定表
mysqldump -u username -p longzhou_voting longzhou_teams > teams_backup.sql
```

### 数据恢复
```bash
# 恢复数据库
mysql -u username -p longzhou_voting < backup_20240724.sql
```

## 监控与维护

### 性能监控
- 监控慢查询日志
- 定期检查表大小和索引使用情况
- 监控连接数和并发情况

### 定期维护
```sql
-- 优化表
OPTIMIZE TABLE longzhou_teams;

-- 检查表
CHECK TABLE longzhou_teams;

-- 修复表
REPAIR TABLE longzhou_teams;
```