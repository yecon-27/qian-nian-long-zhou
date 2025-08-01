<template>
  <div class="rank-list">
    <div class="rank-container">
      <div 
        v-for="(card, index) in otherRankedCards" 
        :key="card.id" 
        class="rank-list-item"
      >
        <div class="rank-number">
          <div class="star-background">
            <DynamicImage 
              resource-key="ranking_star" 
              fallback-url="/src/assets/排行榜/排名序号星星.png"
              alt="星星" 
              class="star-icon" 
            />
            <span class="rank-text">{{ String(index + 4).padStart(2, '0') }}</span>
          </div>
        </div>
        <div class="item-content">
          <div class="item-info">
            <h4 class="item-title">{{ card.title }}</h4>
            <p class="item-author">{{ card.author }}</p>
          </div>
          <ToolTip 
            :votes="card.votes" 
            :likes="card.likes" 
            :readCount="card.readCount" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolTip from './ToolTip.vue'
import DynamicImage from '@/components/DynamicImage.vue'

defineProps({
  otherRankedCards: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* 排名列表 */
.rank-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px 100px;
}

.rank-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.rank-list-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 0.5px solid #87CEEB;
  margin: 0 20px;
}

.rank-list-item:last-child {
  border-bottom: none;
}

.rank-number {
  margin-right: 15px;
  margin-left: -10px;
}

.star-background {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.star-icon {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
}

.rank-text {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: bold;
  color: #ff6600;
}

.item-content {
  display: flex;
  align-items: center;
  flex: 1;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 5px 0;
  color: #333;
  text-align: left;
}

.item-author {
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: left;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .rank-list {
    padding: 0 10px 100px;
  }
  
  .rank-list-item {
    padding: 12px;
  }
  
  .star-background {
    width: 45px;
    height: 45px;
  }
  
  .star-icon {
    width: 45px;
    height: 45px;
  }
  
  .rank-text {
    font-size: 17px;
  }
}
</style>
