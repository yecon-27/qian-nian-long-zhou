<template>
  <div class="team-vote-card" @click="handleCardClick">
    <div class="card-image-wrapper">
      <img :src="card.img" :alt="card.title" class="card-image" />
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ card.title }}</h3>
      <div class="card-details">
        <p class="card-author">{{ card.author }}</p>
        <p class="card-votes">{{ card.votes }}票</p>
      </div>
      <button class="vote-button" @click.stop="toggleVote">
        <img v-if="card.voted" src="@/assets/投票/点赞（已选中状态）.png" alt="已投票" class="vote-icon" />
        <img v-else src="@/assets/投票/点赞（未选中状态）.png" alt="投票" class="vote-icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamVoteCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleVote() {
      // 触发一个自定义事件，通知父组件（App.vue）来更新数据
      this.$emit('toggle-vote', this.card.id);
    },
    handleCardClick() {
      // 跳转到详情页面，传递卡片id作为参数
      this.$router.push({
        name: 'DetailPage',
        params: { id: this.card.id }
      });
    }
  }
};
</script>

<style scoped>
.team-vote-card {
  background-color: white;
  /* 卡片背景白色 */
  border-radius: 10px;
  /* 圆角 */
  overflow: hidden;
  /* 确保图片圆角 */
  display: flex;
  flex-direction: column;
  text-align: left;
  /* 文字左对齐 */
  /* margin: 0 auto; 居中卡片，防止“太宽”时单卡片散开 */
  max-width: 400px !important;
  /* 限制单张卡片的最大宽度，根据设计图估算 */
}

.card-image-wrapper {
  width: calc(100% - 30px);
  /* 左右各留出10px空间 */
  margin: 10px;
  /* 上下左右都有10px边距 */
  padding-top: 55%;
  /* 图片宽高比 */
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.card-image {
  position: absolute;
  top: 5px;
  padding: 2px;
  width: 100%;
  height: 100%;
  display: block;
}

.card-content {
  padding: 0 10px 10px 10px !important;
  /* 左右10px，下方10px，顶部0px */
  display: flex;
  flex-direction: column;
  gap: 8px !important;
  /* 内容项之间的间距 */
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
  /* 移除默认外边距 */
  white-space: nowrap;
  /* 防止标题换行 */
  overflow: hidden;
  /* 隐藏超出部分 */
  text-overflow: ellipsis;
  /* 显示省略号 */
}

.card-details {
  display: flex;
  justify-content: space-between;
  /* 作者和票数左右对齐 */
  align-items: baseline;
  /* 底部对齐 */
  margin-top: -5px;
}

.card-author {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.card-votes {
  font-size: 15px;
  /* 票数稍大 */
  color: #ff6600;
  /* 橙色 */
  font-weight: bold;
  margin: 0;
}

.vote-button {
  margin-top: -5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* 改为左对齐 */
  width: 100%;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
  background: transparent;
}

.vote-button:hover {
  transform: scale(1.05);
}

.vote-button .vote-icon {
  width: 140px !important;
  height: auto;
  display: block;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .card-content {
    padding: 0 8px 8px 8px !important;
    /* 移动端减少padding */
  }

  .card-image-wrapper {
    width: calc(100% - 16px);
    /* 移动端左右各留出8px空间 */
    margin: 8px;
    /* 移动端边距 */
  }

  .card-title {
    font-size: 15px;
  }

  .card-author,
  .card-votes {
    font-size: 13px;
  }

  .vote-button {
    padding: 6px 0;
  }

  .vote-button .vote-icon {
    width: 100px;
  }
}
</style>