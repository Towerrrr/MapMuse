<template>
  <nav class="top-navigation" :class="{ 'top-navigation--light': isLightMode }" aria-label="顶部导航菜单">
    <div class="top-navigation__rail">
      <button
        v-for="item in menuItems"
        :key="item.key"
        type="button"
        class="top-navigation__item"
        :class="{ 'top-navigation__item--active': item.key === activeKey }"
        :aria-pressed="item.key === activeKey"
        @click="emit('select', item.key)"
      >
        <img class="top-navigation__icon" src="/Terraria_icon.jfif" alt="" aria-hidden="true" />
        <span class="top-navigation__label">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  isLightMode: {
    type: Boolean,
    default: false,
  },
  activeKey: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['select'])

const menuItems = [
  { key: 'Daily', label: '日常' },
  { key: 'CS', label: 'CS' },
  { key: 'Terraria', label: '泰拉' },
  { key: 'ARK', label: 'ARK' },
]
</script>

<style scoped>
.top-navigation {
  top: 0;
  width: 100%;
  margin: 0 auto;
}

.top-navigation__rail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  padding: 1px;
  background: linear-gradient(to bottom, #111418, #07090c);
  border: 1px solid #2d333b;
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.top-navigation__item {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 60px;
  border: 1px solid #262b31;
  padding: 0 18px 0 14px;
  background: linear-gradient(to bottom, #252a31, #171b20);
  color: #e4e7eb;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.top-navigation__item:hover,
.top-navigation__item:focus-visible {
  color: #ffffff;
  border-color: #48515b;
  background: linear-gradient(to bottom, #313842, #20252c);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.03);
  outline: none;
}

.top-navigation__item--active {
  color: #ffffff;
  border-color: #66707c;
  background: linear-gradient(to bottom, #38414c, #232931);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}

.top-navigation__item:active {
  transform: translateY(1px);
}

.top-navigation__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
}

.top-navigation__icon {
  width: 30px;
  height: 30px;
  flex: 0 0 18px;
  object-fit: contain;
  image-rendering: auto;
  filter: saturate(1.05) contrast(1.05);
}

.top-navigation--light .top-navigation__rail {
  border-color: #c9d0d8;
  background: linear-gradient(to bottom, #fdfdfd, #e9edf2);
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
}

.top-navigation--light .top-navigation__item {
  color: #2b3138;
  border-color: #d2d8df;
  background: linear-gradient(to bottom, #ffffff, #e7ebf0);
}

.top-navigation--light .top-navigation__item:hover,
.top-navigation--light .top-navigation__item:focus-visible {
  color: #101418;
  border-color: #b8c0c9;
  background: linear-gradient(to bottom, #f7f9fb, #dde3ea);
}

.top-navigation--light .top-navigation__item--active {
  color: #101418;
  border-color: #aeb7c1;
  background: linear-gradient(to bottom, #eef2f6, #d9e0e8);
}
</style>
