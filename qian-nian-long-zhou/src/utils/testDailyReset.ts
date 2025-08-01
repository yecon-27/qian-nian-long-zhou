// 测试每日重置功能的工具
// 在浏览器控制台中运行这些函数来测试

declare global {
  interface Window {
    testDailyReset: {
      getDateInfo: () => any;
      simulateYesterday: () => void;
      resetToToday: () => void;
      viewStoredData: () => void;
      clearAllData: () => void;
    };
  }
}

window.testDailyReset = {
  // 获取当前日期信息
  getDateInfo() {
    const today = new Date()
    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')
    const lastVoteDate = localStorage.getItem('dragon-boat-last-vote-date')
    
    console.log('今天日期:', todayString)
    console.log('最后投票日期:', lastVoteDate)
    console.log('是否是新的一天:', lastVoteDate !== todayString)
    
    return {
      today: todayString,
      lastVoteDate,
      isNewDay: lastVoteDate !== todayString
    }
  },

  // 模拟昨天的日期（用于测试）
  simulateYesterday() {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayString = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1).toString().padStart(2, '0') + '-' + yesterday.getDate().toString().padStart(2, '0')
    
    localStorage.setItem('dragon-boat-last-vote-date', yesterdayString)
    console.log('已设置最后投票日期为昨天:', yesterdayString)
    console.log('刷新页面以测试每日重置功能')
  },

  // 重置到今天
  resetToToday() {
    const today = new Date()
    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0')
    
    localStorage.setItem('dragon-boat-last-vote-date', todayString)
    console.log('已重置最后投票日期为今天:', todayString)
  },

  // 查看存储的数据
  viewStoredData() {
    const data = localStorage.getItem('dragon-boat-teams-data')
    if (data) {
      const parsed = JSON.parse(data)
      console.log('存储的队伍数据:', parsed)
      
      // 显示每个队伍的点赞状态
      parsed.forEach((team: any) => {
        console.log(`${team.title}: 点赞数=${team.likes}, 已投票=${team.liked}`)
      })
    } else {
      console.log('没有找到存储的数据')
    }
  },

  // 清除所有数据
  clearAllData() {
    localStorage.removeItem('dragon-boat-teams-data')
    localStorage.removeItem('dragon-boat-last-vote-date')
    console.log('已清除所有存储数据')
  }
}

console.log('测试工具已加载，可以使用以下函数：')
console.log('- testDailyReset.getDateInfo() - 获取日期信息')
console.log('- testDailyReset.simulateYesterday() - 模拟昨天（测试重置）')
console.log('- testDailyReset.resetToToday() - 重置到今天')
console.log('- testDailyReset.viewStoredData() - 查看存储数据')
console.log('- testDailyReset.clearAllData() - 清除所有数据')

export {}
