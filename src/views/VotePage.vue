const toggleVote = (id: number) => {
  // 如果用户已经投过票，则不允许再选择
  if (teamsStore.hasVotedToday) {
    showToast({
      type: 'fail',
      message: '您今日已经投过票了，每人每天只能投票一次'
    })
    return
  }
  
  try {
    // 只切换本地选中状态，不调用API
    teamsStore.toggleLocalSelection(id)
  } catch (error: any) {
    showToast({
      type: 'fail',
      message: error.message || '选择失败'
    })
  }
}