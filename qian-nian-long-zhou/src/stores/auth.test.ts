import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from './auth'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authApi } from '@/api/team'
import { AxiosHeaders } from 'axios' // 导入 AxiosHeaders

// 模拟 api/team 模块
vi.mock('@/api/team', () => ({
  authApi: {
    login: vi.fn(),
    logout: vi.fn(),
    getUserInfo: vi.fn(),
    register: vi.fn(),
  },
}))

describe('Auth Store', () => {
  beforeEach(() => {
    // 创建一个新的 pinia 实例并使其处于激活状态
    setActivePinia(createPinia())
    // 在每个测试前清除模拟历史和实现
    vi.clearAllMocks()
    // 清除 localStorage
    localStorage.clear()
  })

  it('初始状态应正确', () => {
    const auth = useAuthStore()
    expect(auth.token).toBe(null)
    expect(auth.user).toBe(null)
    expect(auth.isAuthenticated).toBe(false)
  })

  it('应该成功登录', async () => {
    const auth = useAuthStore()
    const token = 'mock-token'
    
    const mockResponse = {
      data: {
        token,
        user: {
          id: 1,
          username: 'testuser',
          nickname: 'Test User'
        },
        roles: ['user'],
        permissions: ['read']
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(), // 使用 AxiosHeaders 实例
      config: {
        headers: new AxiosHeaders() // 使用 AxiosHeaders 实例
      }
    };
    
    vi.mocked(authApi.login).mockResolvedValue(mockResponse);
    vi.mocked(authApi.getUserInfo).mockResolvedValue(mockResponse);
    
    await auth.login('testuser', 'password')
  })

  // 对所有其他测试用例应用相同的修复
  it('使用错误的凭据登录应失败', async () => {
    const auth = useAuthStore()
    vi.mocked(authApi.login).mockRejectedValue({ 
      response: { status: 401 }, 
      message: '用户名或密码错误' 
    } as any)

    await expect(auth.login('wronguser', 'wrongpass')).rejects.toThrow('用户名或密码错误')
    expect(auth.token).toBe(null)
    expect(auth.user).toBe(null)
    expect(auth.isAuthenticated).toBe(false)
  })

  it('logout 应清除认证状态', async () => {
    // 设置初始登录状态
    const auth = useAuthStore()
    auth.token = 'fake-token'
    auth.user = { userId: 1, username: 'test', nickname: 'Test', roles: [], permissions: [] }
    localStorage.setItem('token', 'fake-token')

    vi.mocked(authApi.logout).mockResolvedValue({} as any)

    await auth.logout()

    expect(authApi.logout).toHaveBeenCalled()
    expect(auth.token).toBe(null)
    expect(auth.user).toBe(null)
    expect(localStorage.getItem('token')).toBe(null)
    expect(auth.isAuthenticated).toBe(false)
  })

  it('getUserInfo 应获取并设置用户数据', async () => {
    const auth = useAuthStore()
    auth.token = 'fake-token' // 需要 token 才能获取用户信息
    const userData = {
      userId: 1,
      userName: 'testuser',
      nickName: 'Test User',
      avatar: 'avatar.png',
      email: 'test@example.com',
      phonenumber: '1234567890',
    }
    const roles = ['admin']
    const permissions = ['create', 'read', 'update', 'delete']

    it('should get user info successfully', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, username: 'testuser' },
          roles: ['user'],
          permissions: ['read']
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: {} as any
        }
      };
      
      vi.mocked(authApi.getUserInfo).mockResolvedValue(mockResponse as any);
      
      await auth.getUserInfo()
    });

    expect(auth.user).not.toBe(null)
    expect(auth.user?.userId).toBe(userData.userId)
    expect(auth.user?.username).toBe(userData.userName)
    expect(auth.user?.nickname).toBe(userData.nickName)
    expect(auth.user?.roles).toEqual(roles)
    expect(auth.user?.permissions).toEqual(permissions)
  })

  it('如果 token 有效，initAuth 应恢复会话', async () => {
    const token = 'valid-token'
    localStorage.setItem('token', token)
    const auth = useAuthStore()
    auth.token = token

    const userData = { userId: 1, userName: 'test', nickName: 'Test' }
    vi.mocked(authApi.getUserInfo).mockResolvedValue({
      user: userData,
      roles: [],
      permissions: []
    } as any)

    await auth.initAuth()

    expect(authApi.getUserInfo).toHaveBeenCalled()
    expect(auth.user).not.toBe(null)
    expect(auth.isAuthenticated).toBe(true)
  })

  it('如果 token 无效，initAuth 应登出', async () => {
    const token = 'invalid-token'
    localStorage.setItem('token', token)
    const auth = useAuthStore()
    auth.token = token

    vi.mocked(authApi.getUserInfo).mockRejectedValue(new Error('Invalid token'))

    await auth.initAuth()

    expect(auth.token).toBe(null)
    expect(auth.user).toBe(null)
    expect(auth.isAuthenticated).toBe(false)
  })

  it('hasPermission 应检查用户权限', () => {
    const auth = useAuthStore()
    auth.user = { userId: 1, username: 'test', nickname: 'Test', roles: [], permissions: ['can_vote', 'can_view'] }
    expect(auth.hasPermission('can_vote')).toBe(true)
    expect(auth.hasPermission('can_edit')).toBe(false)
  })

  it('hasRole 应检查用户角色', () => {
    const auth = useAuthStore()
    auth.user = { userId: 1, username: 'test', nickname: 'Test', roles: ['admin', 'editor'], permissions: [] }
    expect(auth.hasRole('admin')).toBe(true)
    expect(auth.hasRole('viewer')).toBe(false)
  })
})