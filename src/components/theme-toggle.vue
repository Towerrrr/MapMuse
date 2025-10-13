<template>
  <button class="theme-toggle" @click="handleToggleTheme">
    <span v-if="isLightMode">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  props: {
    isLightMode: {
      type: Boolean,
      required: true
    },
  },
  methods: {
    handleToggleTheme() {
      this.$emit('update:isLightMode', !this.isLightMode);
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #555;
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>