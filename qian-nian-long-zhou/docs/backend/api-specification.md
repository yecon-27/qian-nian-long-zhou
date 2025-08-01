# 龙舟投票系统 API 接口规范

## 基础信息

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **字符编码**: UTF-8

## 通用响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2025-07-24T10:30:00Z"
}
```

## 错误码定义

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

## 1. 作品相关接口

### 1.1 获取作品列表

```
GET /works
```

**请求参数**:
```json
{
  "page": 1,
  "size": 10,
  "category": "传统文化",
  "sort": "votes_desc",
  "keyword": "龙舟"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 8,
    "page": 1,
    "size": 10,
    "list": [
      {
        "workId": 1,
        "workTitle": "千年龙舟韵",
        "workAuthor": "魏永明",
        "workDescription": "千年龙舟文化传承至今...",
        "workImage": "/images/work1.jpg",
        "workCategory": "传统文化",
        "workTags": ["传统", "文化", "传承"],
        "totalVotes": 1500,
        "todayVotes": 25,
        "totalViews": 2350,
        "todayViews": 45,
        "ranking": 1,
        "isFeatured": true,
        "createTime": "2025-07-01T10:00:00Z"
      }
    ]
  }
}
```

### 1.2 获取作品详情

```
GET /works/{workId}
```

**路径参数**:
- `workId`: 作品ID

**请求头**:
```
User-ID: user_12345
User-IP: 192.168.1.100
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "workId": 1,
    "workTitle": "千年龙舟韵",
    "workAuthor": "魏永明",
    "workDescription": "千年龙舟文化传承至今...",
    "workImage": "/images/work1.jpg",
    "workImages": ["/images/work1_1.jpg", "/images/work1_2.jpg"],
    "workVideo": "/videos/work1.mp4",
    "workCategory": "传统文化",
    "workTags": ["传统", "文化", "传承"],
    "authorIntro": "资深文化研究者...",
    "creationStory": "这个作品的创作灵感来源于...",
    "totalVotes": 1500,
    "todayVotes": 25,
    "totalViews": 2350,
    "todayViews": 45,
    "ranking": 1,
    "userVoted": false,
    "createTime": "2025-07-01T10:00:00Z"
  }
}
```

### 1.3 获取作品排行榜

```
GET /works/ranking
```

**请求参数**:
```json
{
  "limit": 10,
  "type": "total"  // total: 总排行, today: 今日排行
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "workId": 3,
      "workTitle": "水上飞龙",
      "workAuthor": "张三",
      "workImage": "/images/work3.jpg",
      "totalVotes": 1800,
      "todayVotes": 35,
      "ranking": 1,
      "rankChange": 0  // 排名变化: 1上升, -1下降, 0不变
    },
    {
      "workId": 1,
      "workTitle": "千年龙舟韵",
      "workAuthor": "魏永明",
      "workImage": "/images/work1.jpg",
      "totalVotes": 1500,
      "todayVotes": 25,
      "ranking": 2,
      "rankChange": -1
    }
  ]
}
```

## 2. 投票相关接口

### 2.1 用户投票

```
POST /vote
```

**请求体**:
```json
{
  "userId": "user_12345",
  "workId": 1,
  "userIp": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "投票成功",
  "data": {
    "voteId": 12345,
    "remainingVotes": 2,
    "newVoteCount": 1501,
    "newRanking": 2
  }
}
```

**错误响应**:
```json
{
  "code": 400,
  "message": "您今天已经为该作品投过票了",
  "data": null
}
```

### 2.2 取消投票

```
DELETE /vote
```

**请求体**:
```json
{
  "userId": "user_12345",
  "workId": 1
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "取消投票成功",
  "data": {
    "remainingVotes": 3,
    "newVoteCount": 1499,
    "newRanking": 3
  }
}
```

### 2.3 检查用户投票状态

```
GET /vote/status/{userId}
```

**路径参数**:
- `userId`: 用户ID

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "user_12345",
    "todayVotes": 2,
    "remainingVotes": 1,
    "dailyLimit": 3,
    "votedWorks": [1, 3],
    "canVote": true
  }
}
```

### 2.4 获取用户投票记录

```
GET /vote/records/{userId}
```

**请求参数**:
```json
{
  "page": 1,
  "size": 10,
  "startDate": "2025-07-01",
  "endDate": "2025-07-31"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 15,
    "list": [
      {
        "voteId": 12345,
        "workId": 1,
        "workTitle": "千年龙舟韵",
        "workAuthor": "魏永明",
        "voteDate": "2025-07-24",
        "voteTime": "2025-07-24T10:30:00Z"
      }
    ]
  }
}
```

## 3. 活动配置接口

### 3.1 获取活动配置

```
GET /config/activity
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "configId": 1,
    "activityName": "千年龙舟创意新生",
    "activityTitle": "千年龙舟创意新生 - 龙舟文化作品征集活动",
    "activityDesc": "传承千年龙舟文化，展现创意新生力量...",
    "ruleImage": "/images/rules.jpg",
    "bannerImage": "/images/banner.jpg",
    "backgroundImage": "/images/bg.jpg",
    "startTime": "2025-07-01T00:00:00Z",
    "endTime": "2025-08-31T23:59:59Z",
    "voteStartTime": "2025-07-15T00:00:00Z",
    "voteEndTime": "2025-08-25T23:59:59Z",
    "dailyVoteLimit": 3,
    "maxTeamsPerVote": 3,
    "activityRules": "1. 每人每天最多可投票3次...",
    "contactInfo": "联系邮箱：longzhou@example.com",
    "prizeInfo": "一等奖：奖金5000元...",
    "status": 1
  }
}
```

### 3.2 获取活动规则

```
GET /config/rules
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "ruleImage": "/images/rules.jpg",
    "activityRules": "1. 每人每天最多可投票3次\n2. 每次最多可选择3个作品...",
    "dailyVoteLimit": 3,
    "maxTeamsPerVote": 3,
    "voteStartTime": "2025-07-15T00:00:00Z",
    "voteEndTime": "2025-08-25T23:59:59Z"
  }
}
```

## 4. 统计分析接口

### 4.1 获取投票统计

```
GET /stats/votes
```

**请求参数**:
```json
{
  "startDate": "2025-07-01",
  "endDate": "2025-07-31",
  "groupBy": "day"  // day, work, user
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalVotes": 12500,
    "todayVotes": 245,
    "totalUsers": 3200,
    "activeUsers": 156,
    "chartData": [
      {
        "date": "2025-07-24",
        "votes": 245,
        "users": 156
      }
    ]
  }
}
```

### 4.2 获取浏览统计

```
GET /stats/views
```

**请求参数**:
```json
{
  "workId": 1,
  "startDate": "2025-07-01",
  "endDate": "2025-07-31"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "totalViews": 2350,
    "todayViews": 45,
    "uniqueUsers": 1200,
    "avgDuration": 120,
    "chartData": [
      {
        "date": "2025-07-24",
        "views": 45,
        "uniqueUsers": 32,
        "avgDuration": 125
      }
    ]
  }
}
```

## 5. 用户相关接口

### 5.1 生成用户ID

```
POST /user/generate
```

**请求体**:
```json
{
  "deviceInfo": "iPhone 12",
  "userAgent": "Mozilla/5.0...",
  "userIp": "192.168.1.100"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "userId": "user_1721808000_abc123def",
    "expiresIn": 86400
  }
}
```

### 5.2 验证用户ID

```
GET /user/validate/{userId}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "valid": true,
    "userId": "user_12345",
    "createTime": "2025-07-24T10:00:00Z"
  }
}
```

## 6. 管理接口 (可选)

### 6.1 更新活动配置

```
PUT /admin/config/activity/{configId}
```

**请求体**:
```json
{
  "activityName": "千年龙舟创意新生",
  "dailyVoteLimit": 5,
  "ruleImage": "/images/new_rules.jpg"
}
```

### 6.2 获取投票详情

```
GET /admin/votes
```

**请求参数**:
```json
{
  "page": 1,
  "size": 20,
  "workId": 1,
  "userId": "user_12345",
  "startDate": "2025-07-01"
}
```

## 接口实现建议

### 1. 技术栈推荐
- **后端框架**: Spring Boot + MyBatis-Plus
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **文档**: Swagger/OpenAPI

### 2. 关键实现点

#### 防刷票机制
```java
@Service
public class VoteService {
    
    @Transactional
    public VoteResult vote(VoteRequest request) {
        // 1. 检查用户今日投票次数
        int todayVotes = voteMapper.countTodayVotes(request.getUserId());
        if (todayVotes >= activityConfig.getDailyVoteLimit()) {
            throw new BusinessException("今日投票次数已用完");
        }
        
        // 2. 检查是否重复投票
        boolean alreadyVoted = voteMapper.checkUserVoted(
            request.getUserId(), request.getWorkId(), LocalDate.now()
        );
        if (alreadyVoted) {
            throw new BusinessException("您已为该作品投过票");
        }
        
        // 3. 记录投票
        VoteRecord record = new VoteRecord();
        record.setUserId(request.getUserId());
        record.setTeamId(request.getWorkId());
        record.setVoteDate(LocalDate.now());
        record.setUserIp(request.getUserIp());
        voteMapper.insert(record);
        
        // 4. 更新作品票数
        workMapper.incrementVotes(request.getWorkId());
        
        return VoteResult.success();
    }
}
```

#### 浏览记录
```java
@Async
public void recordView(Long workId, String userId, String userIp) {
    ViewRecord record = new ViewRecord();
    record.setWorkId(workId);
    record.setUserId(userId);
    record.setUserIp(userIp);
    record.setViewDate(LocalDate.now());
    viewMapper.insert(record);
    
    // 更新作品浏览数
    workMapper.incrementViews(workId);
}
```

### 3. 性能优化建议

#### 缓存策略
```java
@Cacheable(value = "works", key = "#page + '_' + #size")
public PageResult<Work> getWorks(int page, int size) {
    // 实现逻辑
}

@CacheEvict(value = "works", allEntries = true)
public void updateWork(Work work) {
    // 更新后清除缓存
}
```

#### 限流控制
```java
@RateLimiter(key = "vote", rate = 10, interval = 60) // 每分钟最多10次
public VoteResult vote(VoteRequest request) {
    // 投票逻辑
}
```

这个API规范为你提供了完整的后端接口设计。接下来我会为你创建前端适配代码。你需要先实现这些API接口吗？