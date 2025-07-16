<template>
  <div class="submission-bar">
    <p class="selection-info">
      {{ selectedCount }}/3 每天最多"PICK"3个作品
    </p>
    <button 
      :class="['submit-button', { 'disabled': !canSubmit }]" 
      :disabled="!canSubmit"
      @click="handleSubmit"
    >
      <img 
        v-if="selectedCount > 0"
        src="@/assets/投票/提交（可选状态）.png" 
        alt="提交" 
        class="submit-button-image"
      />
      <img
        v-else
        src="@/assets/投票/提交（不可选状态）.png" 
        alt="提交（不可选）" 
        class="submit-button-image"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'SubmissionBar',
  props: {
    selectedCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    canSubmit() {
      return this.selectedCount > 0;
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