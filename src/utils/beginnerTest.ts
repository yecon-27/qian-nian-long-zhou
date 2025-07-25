// 初学者专用 - Mock数据测试工具
import { mockApi } from './mockData'

// 在开发环境下创建测试工具
if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true') {
  console.log('🎓 初学者模式已启用！使用Mock数据进行学习')
  
  // 挂载测试函数到 window 对象
  ;(window as any).testMockData = async () => {
    console.log('🧪 开始测试Mock数据...')
    
    try {
      // 测试获取队伍列表
      console.log('1. 测试获取队伍列表...')
      const teams = await mockApi.getTeams()
      console.log('✅ 队伍列表:', teams)
      
      // 测试投票功能
      console.log('2. 测试投票功能...')
      const voteResult = await mockApi.vote(1, 'test_student_openid')
      console.log('✅ 投票结果:', voteResult)
      
      // 测试获取排行榜
      console.log('3. 测试获取排行榜...')
      const ranking = await mockApi.getRanking()
      console.log('✅ 排行榜:', ranking)
      
      // 测试检查投票状态
      console.log('4. 测试检查投票状态...')
      const voteStatus = await mockApi.checkVoted('test_student_openid')
      console.log('✅ 投票状态:', voteStatus)
      
      console.log('🎉 所有Mock数据测试通过！您可以开始学习开发了！')
      
    } catch (error) {
      console.error('❌ Mock数据测试失败:', error)
    }
  }
  
  // 创建切换到真实API的测试函数
  ;(window as any).switchToRealAPI = () => {
    console.log('💡 要切换到真实API，请：')
    console.log('1. 修改 .env.development 文件')
    console.log('2. 将 VITE_USE_MOCK=true 改为 VITE_USE_MOCK=false')
    console.log('3. 刷新页面')
    console.log('4. 确保若依后端正在运行并已配置龙舟数据')
  }
  
  console.log('✅ 初学者测试工具已加载！')
  console.log('🧪 在控制台运行: window.testMockData() 来测试所有功能')
  console.log('🔄 在控制台运行: window.switchToRealAPI() 查看如何切换到真实数据')
}
