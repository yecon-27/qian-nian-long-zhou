<template>
  <div id="app">
    <Header @search="handleSearch" />
    <div class="team-cards-container">
      <TeamVoteCard v-for="card in filteredCards" :key="card.id" :card="card" @toggle-like="toggleLike" />
    </div>
    <SubmissionBar 
      :selectedCount="teamsStore.selectedCardsCount" 
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import Header from '../components/VoteHeader.vue'
import TeamVoteCard from '../components/TeamVoteCard.vue'
import SubmissionBar from '../components/SubmissionBar.vue'
import { useTeamsStore } from '@/stores/teams'

// 导入图片
import teamImage from '@/assets/投票/龙舟队伍配图.jpg'

export default {
  name: 'App',
  components: {
    Header,
    TeamVoteCard,
    SubmissionBar
  },
  setup() {
    const teamsStore = useTeamsStore()
    
    // 为每个卡片添加图片
    teamsStore.teamCards.forEach(card => {
      if (!card.img) {
        card.img = teamImage
      }
    })
    
    return {
      teamsStore
    }
  },
  mounted() {
    // 确保页面加载时滚动到顶部
    window.scrollTo(0, 0)
    
    // 检查是否是新的一天，如果是则重置投票状态
    const teamsStore = useTeamsStore()
    if (teamsStore.checkNewDay()) {
      console.log('新的一天开始，投票状态已重置，点赞量保持不变')
      // 可以在这里添加一些用户提示
      // alert('新的一天开始，您可以重新投票了！')
    }
  },
  data() {
    return {
      searchKeyword: '', // 搜索关键词
    }
  },
  computed: {
    filteredCards() {
      return this.teamsStore.getFilteredCards(this.searchKeyword)
    }
  },
  methods: {
    handleSearch(keyword) {
      this.searchKeyword = keyword
    },
    toggleLike(cardId) {
      this.teamsStore.toggleLike(cardId)
    },
    handleSubmit(selectedCount) {
      // 获取选中的作品
      const selectedCards = this.teamsStore.selectedCards
      
      console.log('提交的作品:', selectedCards)
      
      // 可以在这里添加更多提交后的处理逻辑
      // 比如重置选择状态、跳转页面等
      
      // 可选：提交后重置所有选择
      // this.teamsStore.resetSelection()
    }
  }
}
</script>

<style>
body {
  overflow-y: auto !important;
}

html {
  overflow-y: auto !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #d7f4fa;
  min-height: 100vh;
  height: auto !important; /* 允许高度自适应内容 */
  width: 100%;
  padding-bottom: 200px; /* 大幅增加底部空间 */
  box-sizing: border-box;
  overflow-y: visible !important; /* 强制显示垂直滚动 */
  position: relative; /* 确保定位正确 */
}

.team-cards-container {
  display: grid;
  
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 15px;
  padding: 20px 20px 80px 20px; /* 大幅增加底部内边距 */
  width: 100%;
  max-width: 768px; /* Max width for the card grid */
  box-sizing: border-box;
  margin: 0 auto; /* 居中容器 */
  justify-items: center; /* 卡片在grid中居中 */
  position: relative; /* 确保定位正确 */
}
</style>