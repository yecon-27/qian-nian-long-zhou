# `auth.ts` (用户认证 Store) 功能详解

## 1. 文件目的

`src/stores/auth.ts` 文件是整个前端应用的用户认证核心。它使用 Pinia 创建了一个全局的、响应式的 Store (可以理解为一个全局数据中心)，专门负责处理与用户身份相关的所有状态和操作。这确保了在应用的任何组件中，我们都能以一种统一、可预测的方式来访问和管理用户登录状态。

## 2. 核心组成部分

`useAuthStore` 主要由三部分组成：`State` (状态)、`Actions` (动作) 和 `Getters` (计算属性)。

### State (状态)

State 是 Store 中存储的响应式数据。当这些数据变化时，所有使用它们的地方都会自动更新。

- `token: ref<string | null>`
  - **作用**: 存储从后端获取的 JWT (JSON Web Token)。这是用户已登录的凭证。
  - **特点**: 它会同步到浏览器的 `localStorage` 中。这意味着即使用户关闭或刷新了页面，只要 Token 未过期，下次打开时仍然能保持登录状态。

- `user: ref<User | null>`
  - **作用**: 存储当前登录用户的详细信息，例如用户ID、用户名、昵称、角色、权限等。
  - **特点**: 当用户未登录时，它的值为 `null`。

- `loading: ref<boolean>`
  - **作用**: 一个布尔标志，用于表示当前是否有认证相关的异步操作（如登录、注册）正在进行中。
  - **特点**: 在 UI 组件中，可以根据这个值来显示加载动画，防止用户重复提交。

### Getters (计算属性)

Getters 是基于 State 的计算属性，类似于 Vue 组件中的 `computed`。

- `isAuthenticated: computed<boolean>`
  - **作用**: 动态计算用户是否已认证。
  - **逻辑**: 只有当 `token` 和 `user` 都存在时，才返回 `true`。这是判断用户是否真正登录的权威标准。

### Actions (动作)

Actions 是 Store 中定义的函数，用于执行异步或同步操作，并最终修改 State。这是修改 Store 状态的唯一推荐方式。

- `login(username, password)`
  - **作用**: 处理用户登录逻辑。
  - **流程**:
    1.  调用 `authApi.login` 向后端发送登录请求。
    2.  成功后，从响应中提取 `token` 并保存到 `State` 和 `localStorage`。
    3.  调用 `getUserInfo()` 来获取并设置用户详细信息。
    4.  处理各种可能的错误（如网络错误、密码错误）并抛出。

- `register(userData)`
  - **作用**: 处理用户注册逻辑。
  - **流程**: 调用 `authApi.register` 发送注册请求，并处理加载状态。

- `getUserInfo()`
  - **作用**: 从后端获取当前登录用户的详细信息。
  - **流程**:
    1.  调用 `authApi.getUserInfo` 接口。
    2.  成功后，将返回的用户数据（包括 `user` 对象、`roles`、`permissions`）适配并存入 `State`。
    3.  如果获取失败（例如 Token 失效），会自动调用 `logout()` 清理状态。

- `logout()`
  - **作用**: 处理用户登出逻辑。
  - **流程**:
    1.  （可选）调用 `authApi.logout` 通知后端用户已登出。
    2.  **核心**: 清理本地状态，将 `token` 和 `user` 设为 `null`，并从 `localStorage` 中移除 `token`。

- `initAuth()`
  - **作用**: 在应用初始化时调用，用于恢复用户的登录状态。
  - **流程**: 检查 `localStorage` 中是否存在 `token`。如果存在，则尝试调用 `getUserInfo()` 来验证 `token` 并获取用户信息。如果失败，则清理无效的 `token`。

- `hasPermission(permission)` 和 `hasRole(role)`
  - **作用**: 两个辅助函数，用于在组件中方便地检查当前用户是否拥有特定的权限或角色。

## 3. 如何在组件中使用

在任何 Vue 组件的 `<script setup>` 中，你可以这样使用它：

```typescript
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// 访问状态
const userNickname = authStore.user?.nickname;

// 访问计算属性
if (authStore.isAuthenticated) {
  console.log('用户已登录');
}

// 调用动作
async function handleLogout() {
  await authStore.logout();
  // 跳转到登录页...
}
```

希望这份文档能帮助您！现在您可以基于这些功能点来构思和编写单元测试了。