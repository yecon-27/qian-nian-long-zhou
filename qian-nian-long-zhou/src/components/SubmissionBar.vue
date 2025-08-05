<template>
  <div class="submission-bar">
    <p class="selection-info">
      <span v-if="hasVotedToday" class="voted-status">您今日已投票完成</span>
      <span v-else>{{ selectedCount }}/3 每天最多"PICK"3个作品</span>
    </p>
    <button 
      :class="['submit-button', { 'disabled': !canSubmit }]" 
      :disabled="!canSubmit"
      @click="handleSubmit"
    >
      <DynamicImage 
        v-if="selectedCount === 3 && !hasVotedToday"
        resource-key="vote_submit_enabled" 
        fallback-url="/src/assets/投票/提交（可选状态）.png"
        alt="提交" 
        class="submit-button-image"
      />
      <DynamicImage
        v-else
        resource-key="vote_submit_disabled" 
        fallback-url="/src/assets/投票/提交（不可选状态）.png"
        alt="提交（不可选）" 
        class="submit-button-image"
      />
    </button>
  </div>
</template>

<script>
import DynamicImage from '@/components/DynamicImage.vue'

export default {
  name: 'SubmissionBar',
  components: {
    DynamicImage
  },
  props: {
    selectedCount: {
      type: Number,
      default: 0
    },
    hasVotedToday: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    canSubmit() {
      // 修改：只有选择恰好3个且今日未投票才能提交
      return this.selectedCount === 3 && !this.hasVotedToday;
    }
  },
  methods: {
    handleSubmit() {
      if (this.canSubmit) {
        // 显示提交成功提示
        alert(`点赞成功！您已为 ${this.selectedCount} 个作品点赞。`);
        
        // 触发提交事件，让父组件处理后续逻辑
        this.$emit('submit', this.selectedCount);
      }
    }
  }
};
</script>

<style scoped>
.submission-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  z-index: 100;
}

.selection-info {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.submit-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button-image {
  width: 120px; /* Adjust size as needed */
  height: auto;
  display: block;
}

.submit-button.disabled {
  cursor: not-allowed;
  opacity: 0.8; /* Make it slightly transparent when disabled */
}


</style>