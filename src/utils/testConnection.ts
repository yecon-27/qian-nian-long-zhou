// 测试与若依后端连接的工具
import request from '@/utils/request'

// 测试基础连接
export const testConnection = {
  // 测试后端是否正常运行 - 使用不需要认证的接口
  ping: async () => {
    try {
      // 使用若依的验证码接口，这个通常不需要认证
      const response = await request({
        url: '/captchaImage',
        method: 'get'
      })
      console.log('✅ 后端连接成功:', response)
      return true
    } catch (error) {
      console.error('❌ 后端连接失败:', error)
      return false
    }
  },

  // 测试若依系统信息接口
  testSystemInfo: async () => {
    try {
      const response = await request({
        url: '/system/config/configKey/sys.index.skinName',
        method: 'get'
      })
      console.log('✅ 系统配置接口连接成功:', response)
      return response
    } catch (error) {
      console.error('❌ 系统配置接口需要认证:', error)
      return null
    }
  },

  // 测试登录接口（不实际登录，只测试接口是否存在）
  testLoginApi: async () => {
    try {
      // 只发送一个无效请求来测试接口是否存在
      const response = await request({
        url: '/login',
        method: 'post',
        data: { username: 'test', password: 'test' }
      })
      console.log('✅ 登录接口存在:', response)
      return response
    } catch (error) {
      if ((error as any).response && (error as any).response.status) {
        console.log('✅ 登录接口存在，返回状态:', (error as any).response.status)
        console.log('💡 这是正常的，因为我们发送的是测试数据')
        return { status: 'exists', error: (error as any).response.data }
      } else {
        console.error('❌ 登录接口连接失败:', error)
        return null
      }
    }
  },

  // 测试您的图书管理接口
  testBookApi: async () => {
    try {
      const response = await request({
        url: '/system/book/list',
        method: 'get'
      })
      console.log('✅ 图书管理接口连接成功:', response)
      return response
    } catch (error) {
      console.error('❌ 图书管理接口连接失败:', error)
      console.log('💡 提示：请确保在若依后端已经创建了图书管理模块')
      return null
    }
  },

  // 测试龙舟队伍接口（待实现）
  testTeamApi: async () => {
    try {
      const response = await request({
        url: '/system/team/list',
        method: 'get'
      })
      console.log('✅ 龙舟队伍接口连接成功:', response)
      return response
    } catch (error) {
      console.error('❌ 龙舟队伍接口连接失败:', error)
      console.log('💡 提示：龙舟队伍接口还需要在若依后端实现')
      return null
    }
  }
}

// 立即挂载测试函数到 window 对象（开发环境）
if (import.meta.env.DEV) {
  console.log('🔧 加载后端连接测试工具...')
  
  // 挂载测试函数
  ;(window as any).testBackendConnection = testConnection.ping
  ;(window as any).testSystemInfo = testConnection.testSystemInfo
  ;(window as any).testLoginApi = testConnection.testLoginApi
  ;(window as any).testBookApi = testConnection.testBookApi
  ;(window as any).testTeamApi = testConnection.testTeamApi
  
  console.log('✅ 测试工具已加载！可以在控制台运行：')
  console.log('• window.testBackendConnection() - 测试后端基础连接')
  console.log('• window.testSystemInfo() - 测试系统信息接口') 
  console.log('• window.testLoginApi() - 测试登录接口')
  console.log('• window.testBookApi() - 测试图书管理接口')
  console.log('• window.testTeamApi() - 测试龙舟队伍接口')
}
