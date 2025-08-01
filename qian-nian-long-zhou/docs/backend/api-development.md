# 若依后端开发步骤详解

## 🚀 第1步：创建数据表

1. **登录若依管理界面**: http://localhost:8080 (admin/admin123)

2. **执行SQL**: 在数据库中执行 `longzhou_tables.sql` 文件中的SQL语句

3. **验证表创建**: 确保 `longzhou_team` 和 `longzhou_vote_record` 表创建成功

## 🛠️ 第2步：使用代码生成器

### 2.1 导入表结构
1. 进入 "系统工具" → "代码生成"
2. 点击 "导入表"
3. 选择 `longzhou_team` 表
4. 点击 "确定"

### 2.2 配置生成选项
```
表名：longzhou_team
类名：LongzhouTeam
功能名：龙舟队伍
作者：您的名字
包路径：com.ruoyi.longzhou
模块名：longzhou
上级菜单：选择现有菜单或创建新的父菜单
生成菜单：是（自动创建菜单）
```

### 2.3 菜单结构规划
建议的菜单层级：
```
📁 龙舟管理 (父菜单)
├── 🏆 队伍管理 (longzhou_team表)
├── 📊 投票记录 (longzhou_vote_record表) 
├── 📈 数据统计 (自定义页面)
└── ⚙️ 系统配置 (参数设置)
```

### 2.3 字段配置
```
team_id: 主键，自增
team_name: 必填，查询条件
team_author: 可选，查询条件  
votes: 数字类型
likes: 数字类型
status: 字典类型（正常/停用）
```

### 2.4 生成代码
1. 点击 "生成代码"
2. 下载生成的代码包
3. 解压到若依项目对应目录

## 🗂️ 第2.5步：配置菜单结构

代码生成后，需要手动配置菜单：

### 2.5.1 创建父菜单
1. **进入菜单管理**：系统管理 → 菜单管理
2. **新增父菜单**：
   ```
   菜单名称：龙舟管理
   显示顺序：4
   路由地址：/longzhou
   菜单类型：目录
   菜单图标：fa fa-ship
   是否可见：显示
   ```

### 2.5.2 配置子菜单
为生成的功能添加菜单项：
```
菜单名称：队伍管理
父菜单：龙舟管理
显示顺序：1
路由地址：longzhou/team
组件路径：longzhou/team/index
菜单类型：菜单
权限标识：longzhou:team:view
```

### 2.5.3 配置按钮权限
为每个功能配置增删改查权限：
```
查询：longzhou:team:query
新增：longzhou:team:add  
修改：longzhou:team:edit
删除：longzhou:team:remove
导出：longzhou:team:export
```

## 📁 第3步：集成生成的代码

### 3.1 后端文件位置
```
ruoyi-admin/src/main/java/com/ruoyi/
├── longzhou/
│   ├── controller/LongzhouTeamController.java
│   ├── domain/LongzhouTeam.java  
│   ├── mapper/LongzhouTeamMapper.java
│   └── service/
│       ├── ILongzhouTeamService.java
│       └── impl/LongzhouTeamServiceImpl.java
│
└── ruoyi-admin/src/main/resources/mapper/longzhou/
    └── LongzhouTeamMapper.xml
```

### 3.2 前端文件位置
```
ruoyi-ui/src/views/longzhou/team/
├── index.vue (列表页面)
├── add.vue (新增页面)  
└── edit.vue (编辑页面)
```

## 🌐 第4步：创建公开API接口

为微信小程序创建无需认证的接口：

### 4.1 创建公开控制器
```java
// 在controller包下创建
@RestController
@RequestMapping("/api/public/longzhou")
public class LongzhouPublicController {
    
    @Autowired
    private ILongzhouTeamService teamService;
    
    // 获取队伍列表（无需认证）
    @GetMapping("/teams")
    public AjaxResult getTeams() {
        List<LongzhouTeam> teams = teamService.selectLongzhouTeamList(new LongzhouTeam());
        return AjaxResult.success(teams);
    }
    
    // 投票接口（基于openid防重复）
    @PostMapping("/vote")
    public AjaxResult vote(@RequestParam Long teamId, @RequestParam String openid) {
        // 投票业务逻辑
        return teamService.voteForTeam(teamId, openid);
    }
    
    // 点赞接口
    @PostMapping("/like")  
    public AjaxResult like(@RequestParam Long teamId, @RequestParam String openid) {
        // 点赞业务逻辑
        return teamService.likeTeam(teamId, openid);
    }
    
    // 获取排行榜
    @GetMapping("/ranking")
    public AjaxResult getRanking() {
        List<LongzhouTeam> ranking = teamService.getTeamRanking();
        return AjaxResult.success(ranking);
    }
}
```

### 4.2 配置安全白名单
在 `SecurityConfig.java` 中添加：
```java
.antMatchers("/api/public/**").permitAll()
```

## 🔄 第5步：实现业务逻辑

### 5.1 投票服务实现
```java
@Override
public AjaxResult voteForTeam(Long teamId, String openid) {
    // 1. 检查今日是否已投票
    if (hasVotedToday(teamId, openid)) {
        return AjaxResult.error("今日已投票，请明日再来！");
    }
    
    // 2. 增加投票数
    LongzhouTeam team = selectLongzhouTeamById(teamId);
    team.setVotes(team.getVotes() + 1);
    updateLongzhouTeam(team);
    
    // 3. 记录投票
    recordVote(teamId, openid, "1"); // 1=投票
    
    return AjaxResult.success("投票成功！");
}
```

## 🧪 第6步：测试接口

### 6.1 测试URLs
```
GET  /api/public/longzhou/teams      - 获取队伍列表
POST /api/public/longzhou/vote       - 投票
POST /api/public/longzhou/like       - 点赞  
GET  /api/public/longzhou/ranking    - 排行榜
```

### 6.2 前端连接测试
修改前端配置：
```bash
# .env.development
VITE_USE_MOCK=false  # 切换到真实API
```

## 📋 完成检查清单

- [x] 数据表创建成功
- [x] 代码生成完成
- [ ] 后端代码集成
- [ ] 公开API创建
- [ ] 安全配置更新
- [ ] 业务逻辑实现
- [ ] 接口测试通过
- [ ] 前端连接成功

## 💡 开发建议

1. **先实现基础CRUD** - 确保数据库操作正常
2. **再添加业务逻辑** - 投票防重复、点赞等
3. **最后优化性能** - 缓存、分页等

您想从哪一步开始？我可以提供具体的代码示例！🚀
