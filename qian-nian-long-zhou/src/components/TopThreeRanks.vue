<template>
  <div class="top-three">
    <div class="rank-item second-place" v-if="rankedCards[1]">
      <DynamicImage 
        resource-key="second_place" 
        fallback-url="/src/assets/排行榜/第二名.png"
        alt="第二名" 
        class="rank-background" 
      />
      <div class="rank-content">
        <h3 class="rank-title">{{ rankedCards[1].title }}</h3>
        <p class="rank-author">{{ rankedCards[1].author }}</p>
        <ToolTip 
          :votes="rankedCards[1].votes" 
          :likes="rankedCards[1].likes" 
          :readCount="rankedCards[1].readCount" 
        />
      </div>
    </div>

    <div class="rank-item first-place" v-if="rankedCards[0]">
      <DynamicImage 
        resource-key="first_place" 
        fallback-url="/src/assets/排行榜/第一名.png"
        alt="第一名" 
        class="rank-background" 
      />
      <div class="rank-content">
        <h3 class="rank-title">{{ rankedCards[0].title }}</h3>
        <p class="rank-author">{{ rankedCards[0].author }}</p>
        <ToolTip 
          :votes="rankedCards[0].votes" 
          :likes="rankedCards[0].likes" 
          :readCount="rankedCards[0].readCount" 
        />
      </div>
    </div>

    <div class="rank-item third-place" v-if="rankedCards[2]">
      <DynamicImage 
        resource-key="third_place" 
        fallback-url="/src/assets/排行榜/第三名.png"
        alt="第三名" 
        class="rank-background" 
      />
      <div class="rank-content">
        <h3 class="rank-title">{{ rankedCards[2].title }}</h3>
        <p class="rank-author">{{ rankedCards[2].author }}</p>
        <ToolTip 
          :votes="rankedCards[2].votes" 
          :likes="rankedCards[2].likes" 
          :readCount="rankedCards[2].readCount" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolTip from './ToolTip.vue'
import DynamicImage from '@/components/DynamicImage.vue'

defineProps({
  rankedCards: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* 前三名展示区 */
.top-three {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
  padding: 14px;
  margin-bottom: 0px;
  transform: translateY(-10px);
}

.rank-item {
  position: relative;
  text-align: center;
  min-width: 110px;
}

.first-place {
  order: 2;
  transform: translateY(-35px);
}

.second-place {
  order: 1;
  transform: translateY(5px);
}

.third-place {
  order: 3;
  transform: translateY(5px);
}

.rank-background {
  width: 100%;
  height: auto;
  max-width: 165px;
  display: block;
}

.rank-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  z-index: 2;
}

.rank-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 3px 0;
  color: #333;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

.rank-author {
  font-size: 14px;
  color: #666;
  margin: 3px 0;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-three {
    gap: 10px;
    padding: 10px;
  }
  
  .rank-item {
    min-width: 88px;
  }
  
  .first-place {
    transform: translateY(-25px);
  }
  
  .second-place,
  .third-place {
    transform: translateY(3px);
  }
  
  .rank-background {
    max-width: 125px;
  }
  
  .rank-title {
    font-size: 16px;
  }
  
  .rank-author {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .top-three {
    gap: 6px;
    padding: 6px;
  }
  
  .rank-item {
    min-width: 75px;
  }
  
  .first-place {
    transform: translateY(-20px);
  }
  
  .second-place,
  .third-place {
    transform: translateY(2px);
  }
  
  .rank-background {
    max-width: 100px;
  }
  
  .rank-title {
    font-size: 16px;
  }
  
  .rank-author {
    font-size: 14px;
  }
}
</style>
