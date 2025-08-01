# 若依代码生成器配置指南

## 🎯 为 longzhou_team 表配置

### 基本信息
```
表名：longzhou_team
类名：LongzhouTeam  
功能名：龙舟队伍
作者：您的名字
包路径：com.ruoyi.longzhou
模块名：longzhou
业务名：team
```

### 生成信息
```
生成代码：是
生成菜单：是（如果还没有菜单的话）
上级菜单：龙舟管理
```

### 字段配置重点
```
team_id: 
  - 主键：是
  - 自增：是
  - 必填：是
  - 显示类型：不显示（主键通常不显示）

team_name:
  - 必填：是
  - 查询方式：LIKE
  - 显示类型：输入框
  - 列表显示：是

team_author:
  - 查询方式：LIKE
  - 显示类型：输入框
  - 列表显示：是

votes, likes, read_count:
  - 显示类型：数字输入框
  - 列表显示：是

status:
  - 显示类型：单选框
  - 字典类型：sys_normal_disable

create_time, update_time:
  - 显示类型：日期时间
  - 列表显示：是（create_time）
```

## 🎯 为 longzhou_vote_record 表配置

### 基本信息
```
表名：longzhou_vote_record
类名：LongzhouVoteRecord
功能名：投票记录
作者：您的名字  
包路径：com.ruoyi.longzhou
模块名：longzhou
业务名：voteRecord
```

### 字段配置重点
```
vote_id: 主键，不显示
team_id: 外键，选择框（关联longzhou_team）
user_openid: 输入框，列表显示
vote_date: 日期选择，查询条件
vote_type: 单选框，字典类型
```

## 🚀 生成后的文件结构

### 后端文件
```
ruoyi-admin/src/main/java/com/ruoyi/longzhou/
├── controller/
│   ├── LongzhouTeamController.java
│   └── LongzhouVoteRecordController.java
├── domain/
│   ├── LongzhouTeam.java
│   └── LongzhouVoteRecord.java
├── mapper/
│   ├── LongzhouTeamMapper.java
│   └── LongzhouVoteRecordMapper.java
└── service/
    ├── ILongzhouTeamService.java
    ├── ILongzhouVoteRecordService.java
    └── impl/
        ├── LongzhouTeamServiceImpl.java
        └── LongzhouVoteRecordServiceImpl.java
```

### 前端文件
```
ruoyi-ui/src/views/longzhou/
├── team/
│   └── index.vue
└── voteRecord/
    └── index.vue
```

## ⚡ 快速操作步骤

1. **导入 longzhou_team 表**
2. **配置字段（重点：team_name设为查询条件）**
3. **点击"生成代码"**
4. **下载zip文件**
5. **解压到对应目录**
6. **重启若依服务**
7. **测试CRUD功能**

## 🎯 常见问题

### Q: 导入表时看不到表？
A: 
- 检查数据库连接
- 确认表在正确的数据库中
- 重启若依服务

### Q: 生成的代码在哪里？
A: 下载的zip包需要手动解压到若依项目目录

### Q: 生成后页面还是空白？
A: 需要重启若依后端服务，刷新浏览器
