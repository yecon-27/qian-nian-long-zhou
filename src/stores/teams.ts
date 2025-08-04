// 切换本地选中状态（不调用API）- 基于原始票数的即时反馈
function toggleLocalSelection(teamId: number) {
  const team = teamCards.value.find((t) => t.id === teamId);
  if (!team) return;
  
  // 如果要选中队伍，检查是否超过限制
  if (!team.selected) {
    const currentSelectedCount = teamCards.value.filter(t => t.selected).length;
    if (currentSelectedCount >= 3) {
      throw new Error("最多只能选择3个队伍进行投票");
    }
  }
  
  team.selected = !team.selected;
  // 基于原始票数计算显示票数
  team.votes = team.originalVotes + (team.selected ? 1 : 0);
}