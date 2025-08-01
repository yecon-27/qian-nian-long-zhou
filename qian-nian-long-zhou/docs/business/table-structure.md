# 龙舟投票业务表结构与人员管理说明

## 1. 若依人员管理表的作用

- 若依自带的“人员管理”表（如`sys_user`）用于后台管理系统的登录、权限、用户分组等功能。
- 这些表**只用于后台管理和权限控制**，比如谁能登录后台、谁能管理队伍、谁能看投票数据等。
- **不是用来存前端投票用户的**（如微信用户、游客等）。

---

## 2. 业务表结构建议

### 推荐的业务表：
1. **投票记录表**：记录谁、什么时候、给哪个队伍投了票。
2. **活动表**：存活动的规则、时间、限制等（方便以后不改代码直接改规则）。
3. **作品表（队伍卡片）**：存参赛队伍的信息（队名、介绍、图片等）。
4. **浏览记录表**：记录用户浏览了哪些队伍（可选，做大数据分析用）。

---

## 3. 实际开发建议

- **后台管理端**（用若依）：用代码生成器生成“活动”、“队伍（作品）”、“投票记录”、“浏览记录”这些表的管理页面，放到“龙舟管理”菜单下，方便后台人员维护。
- **前端投票端**（小程序/网页）：只需要通过API接口访问这些表，不需要用到若依的“人员管理”表。

---

## 4. 人员表和业务表的关系

- **后台管理用户**（如管理员、活动负责人）用若依自带的`sys_user`表。
- **投票用户**（如微信用户、游客）只需要在“投票记录表”里记录openid或IP等，不需要加到`sys_user`表里。

---

## 5. 典型表结构举例

```sql
-- 活动表
CREATE TABLE activity (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  rule TEXT,
  start_time DATETIME,
  end_time DATETIME,
  status CHAR(1) DEFAULT '1' COMMENT '1启用 0停用'
);

-- 作品/队伍表
CREATE TABLE team (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  author VARCHAR(50),
  description TEXT,
  img VARCHAR(255)
);

-- 投票记录表
CREATE TABLE vote_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  team_id BIGINT,
  user_openid VARCHAR(50),
  vote_time DATETIME
);

-- 浏览记录表（可选）
CREATE TABLE view_record (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  team_id BIGINT,
  user_openid VARCHAR(50),
  view_time DATETIME
);
```

---

## 6. 总结

- **若依的人员表只管后台管理，不用自己建。**
- **投票活动相关的表（队伍、投票、活动、浏览）要自己建，并用代码生成器生成管理页面。**
- **前端投票页面只需要通过接口访问这些表，不用管后台人员表。**

如需具体建表SQL、代码生成器操作或接口对接示例，可以随时问我！
