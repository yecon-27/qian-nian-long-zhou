# 完整前后端方案实施指南

## 🎯 实施概览

这是一个完整的前后端分离方案，包含：

- **数据库**: MySQL 8.0 + 4 张核心表
- **后端**: Spring Boot + MyBatis-Plus API
- **前端**: Vue 3 + TypeScript + Pinia

## 📋 实施步骤

### 第一步：数据库部署

1. **创建数据库**

```sql
CREATE DATABASE longzhou_voting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE longzhou_voting;
```

2. **执行表结构脚本**

```bash
mysql -u root -p longzhou_voting < backend-sql/longzhou_new_tables.sql
```

3. **验证数据库**

```bash
mysql -u root -p longzhou_voting < verify-new-tables.sql
```

### 第二步：后端 API 开发

#### 2.1 项目结构建议

```
backend/
├── src/main/java/com/longzhou/
│   ├── controller/          # 控制器层
│   │   ├── WorkController.java
│   │   ├── VoteController.java
│   │   ├── ConfigController.java
│   │   └── UserController.java
│   ├── service/            # 服务层
│   │   ├── WorkService.java
│   │   ├── VoteService.java
│   │   └── ConfigService.java
│   ├── mapper/             # 数据访问层
│   │   ├── WorkMapper.java
│   │   ├── VoteMapper.java
│   │   └── ConfigMapper.java
│   ├── entity/             # 实体类
│   │   ├── Work.java
│   │   ├── VoteRecord.java
│   │   └── ActivityConfig.java
│   ├── dto/                # 数据传输对象
│   └── config/             # 配置类
└── src/main/resources/
    ├── mapper/             # MyBatis XML
    └── application.yml     # 配置文件
```

#### 2.2 核心 Controller 示例

**WorkController.java**

```java
@RestController
@RequestMapping("/api/works")
@CrossOrigin(origins = "*")
public class WorkController {

    @Autowired
    private WorkService workService;

    @GetMapping
    public ApiResponse<PageResult<Work>> getWorks(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String category,
        @RequestParam(defaultValue = "votes_desc") String sort,
        @RequestParam(required = false) String keyword,
        @RequestHeader(value = "User-ID", required = false) String userId
    ) {
        WorkListParams params = new WorkListParams();
        params.setPage(page);
        params.setSize(size);
        params.setCategory(category);
        params.setSort(sort);
        params.setKeyword(keyword);
        params.setUserId(userId);

        PageResult<Work> result = workService.getWorks(params);
        return ApiResponse.success(result);
    }

    @GetMapping("/{workId}")
    public ApiResponse<Work> getWorkDetail(
        @PathVariable Long workId,
        @RequestHeader(value = "User-ID", required = false) String userId,
        @RequestHeader(value = "User-IP", required = false) String userIp
    ) {
        // 记录浏览
        workService.recordView(workId, userId, userIp);

        Work work = workService.getWorkDetail(workId, userId);
        return ApiResponse.success(work);
    }

    @GetMapping("/ranking")
    public ApiResponse<List<Work>> getWorksRanking(
        @RequestParam(defaultValue = "10") int limit,
        @RequestParam(defaultValue = "total") String type
    ) {
        List<Work> ranking = workService.getWorksRanking(limit, type);
        return ApiResponse.success(ranking);
    }
}
```

**VoteController.java**

```java
@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "*")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping
    public ApiResponse<VoteResponse> vote(@RequestBody VoteRequest request) {
        VoteResponse result = voteService.vote(request);
        return ApiResponse.success(result, "投票成功");
    }

    @DeleteMapping
    public ApiResponse<VoteResponse> cancelVote(@RequestBody CancelVoteRequest request) {
        VoteResponse result = voteService.cancelVote(request.getUserId(), request.getWorkId());
        return ApiResponse.success(result, "取消投票成功");
    }

    @GetMapping("/status/{userId}")
    public ApiResponse<UserVoteStatus> getUserVoteStatus(@PathVariable String userId) {
        UserVoteStatus status = voteService.getUserVoteStatus(userId);
        return ApiResponse.success(status);
    }
}
```

#### 2.3 核心 Service 示例

**VoteService.java**

```java
@Service
@Transactional
public class VoteService {

    @Autowired
    private VoteMapper voteMapper;

    @Autowired
    private WorkMapper workMapper;

    public VoteResponse vote(VoteRequest request) {
        // 1. 检查投票权限
        checkVotePermission(request.getUserId(), request.getWorkId());

        // 2. 记录投票
        VoteRecord record = new VoteRecord();
        record.setUserId(request.getUserId());
        record.setTeamId(request.getWorkId());
        record.setVoteDate(LocalDate.now());
        record.setUserIp(request.getUserIp());
        record.setUserAgent(request.getUserAgent());
        voteMapper.insert(record);

        // 3. 更新作品票数
        workMapper.incrementVotes(request.getWorkId());

        // 4. 获取更新后的信息
        Work work = workMapper.selectById(request.getWorkId());
        int remainingVotes = getRemainingVotes(request.getUserId());

        return VoteResponse.builder()
            .voteId(record.getVoteId())
            .remainingVotes(remainingVotes)
            .newVoteCount(work.getTotalVotes())
            .newRanking(calculateRanking(request.getWorkId()))
            .build();
    }

    private void checkVotePermission(String userId, Long workId) {
        // 检查今日投票次数
        int todayVotes = voteMapper.countTodayVotes(userId, LocalDate.now());
        ActivityConfig config = configMapper.getActiveConfig();

        if (todayVotes >= config.getDailyVoteLimit()) {
            throw new BusinessException("今日投票次数已用完");
        }

        // 检查是否重复投票
        boolean alreadyVoted = voteMapper.checkUserVoted(userId, workId, LocalDate.now());
        if (alreadyVoted) {
            throw new BusinessException("您已为该作品投过票");
        }
    }
}
```

#### 2.4 数据库配置

**application.yml**

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/longzhou_voting?useUnicode=true&characterEncoding=utf8&serverTimezone=GMT%2B8
    username: root
    password: your_password

  redis:
    host: localhost
    port: 6379
    database: 0

mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-field: deleted
      logic-delete-value: 1
      logic-not-delete-value: 0

server:
  port: 8080
  servlet:
    context-path: /

logging:
  level:
    com.longzhou: debug
```

### 第三步：前端代码更新

#### 3.1 安装依赖

```bash
npm install axios
```

#### 3.2 更新 Store 引用

**方案 A: 直接替换（推荐）**

```bash
# 备份原文件
mv src/stores/teams.ts src/stores/teams.backup.ts
# 使用新的API版本
mv src/stores/teamsWithApi.ts src/stores/teams.ts
```

**方案 B: 渐进式迁移**

```typescript
// 在需要的组件中导入新的store
import { useTeamsStore } from "@/stores/teamsWithApi";
```

#### 3.3 更新组件初始化

**VotePage.vue**

```vue
<script>
import { useTeamsStore } from "@/stores/teams";

export default {
  setup() {
    const teamsStore = useTeamsStore();

    // 初始化数据
    onMounted(async () => {
      await teamsStore.initialize();
    });

    return {
      teamsStore,
    };
  },
};
</script>
```

**DetailInfo.vue**

```vue
<script>
import { useTeamsStore } from "@/stores/teams";

export default {
  setup() {
    const route = useRoute();
    const teamsStore = useTeamsStore();

    const teamId = ref(parseInt(route.params.id));

    onMounted(async () => {
      // 记录浏览
      await teamsStore.recordViewAction(teamId.value);
    });

    // 其他逻辑保持不变
  },
};
</script>
```

### 第四步：测试验证

#### 4.1 后端 API 测试

使用 Postman 或 curl 测试 API：

```bash
# 获取作品列表
curl -X GET "http://localhost:8080/api/works?page=1&size=10"

# 获取作品详情
curl -X GET "http://localhost:8080/api/works/1" \
  -H "User-ID: test_user_001"

# 投票
curl -X POST "http://localhost:8080/api/vote" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_001",
    "workId": 1,
    "userIp": "192.168.1.100"
  }'

# 检查投票状态
curl -X GET "http://localhost:8080/api/vote/status/test_user_001"
```

#### 4.2 前端功能测试

1. **页面加载测试**

   - 检查作品列表是否正常加载
   - 检查排行榜是否正确显示

2. **投票功能测试**

   - 测试正常投票流程
   - 测试投票限制（每日 3 次）
   - 测试重复投票限制

3. **浏览统计测试**
   - 检查详情页浏览数是否增加
   - 检查统计数据是否正确

### 第五步：部署配置

#### 5.1 后端部署

**Docker 部署示例**

```dockerfile
FROM openjdk:11-jre-slim

COPY target/longzhou-voting-api.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**docker-compose.yml**

```yaml
version: "3.8"
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: longzhou_voting
    ports:
      - "3306:3306"
    volumes:
      - ./backend-sql:/docker-entrypoint-initdb.d

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  api:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - mysql
      - redis
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/longzhou_voting
      SPRING_REDIS_HOST: redis
```

#### 5.2 前端部署

**Nginx 配置**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api/ {
        proxy_pass http://backend:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🔧 开发工具推荐

### 后端开发

- **IDE**: IntelliJ IDEA
- **数据库工具**: Navicat / DBeaver
- **API 测试**: Postman / Apifox
- **代码生成**: MyBatis-Plus Generator

### 前端开发

- **IDE**: VS Code
- **调试工具**: Vue DevTools
- **API 调试**: 浏览器开发者工具

## 📊 监控和维护

### 性能监控

```java
// 添加性能监控
@Component
public class PerformanceMonitor {

    @EventListener
    public void handleVoteEvent(VoteEvent event) {
        // 记录投票统计
        metricsService.incrementVoteCount();
    }

    @Scheduled(fixedRate = 60000) // 每分钟执行
    public void collectMetrics() {
        // 收集性能指标
        int activeUsers = userService.getActiveUserCount();
        int totalVotes = voteService.getTodayVoteCount();

        metricsService.recordMetrics(activeUsers, totalVotes);
    }
}
```

### 日志配置

```yaml
logging:
  level:
    com.longzhou: info
    org.springframework.web: debug
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n"
  file:
    name: logs/longzhou-voting.log
```

## 🚨 注意事项

### 安全考虑

1. **API 限流**: 防止恶意请求
2. **参数验证**: 严格验证所有输入参数
3. **SQL 注入防护**: 使用参数化查询
4. **CORS 配置**: 正确配置跨域访问

### 性能优化

1. **数据库索引**: 确保关键查询有索引
2. **Redis 缓存**: 缓存热点数据
3. **分页查询**: 避免一次性加载大量数据
4. **异步处理**: 浏览记录等非关键操作异步处理

### 数据一致性

1. **事务管理**: 投票操作使用事务
2. **并发控制**: 防止重复投票
3. **数据校验**: 定期校验数据完整性

## 📈 扩展建议

### 功能扩展

- 实时投票统计大屏
- 微信小程序版本
- 管理后台系统
- 数据分析报表

### 技术升级

- 引入消息队列（RabbitMQ/Kafka）
- 微服务架构改造
- 容器化部署（Kubernetes）
- 监控告警系统（Prometheus + Grafana）

这个完整方案为你提供了从数据库到前端的全栈实现指导。你可以按照这个步骤逐步实施，有任何问题都可以随时询问！
