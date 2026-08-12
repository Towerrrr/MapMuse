<template>
  <div class="demo-dropdown-wrap">
    <a-dropdown :overlayClassName="overlayClassName">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="default">
            <UserOutlined />
            Default
          </a-menu-item>
          <a-menu-item key="Shift">
            <UserOutlined />
            Shift
          </a-menu-item>
          <a-menu-item key="Alt">
            <UserOutlined />
            Alt
          </a-menu-item>
          <a-menu-item key="Ctrl">
            <UserOutlined />
            Ctrl
          </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        {{ currentModifier || 'Default' }}
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { DownOutlined, UserOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  isLightMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['modifierChange'])
const currentModifier = ref('')
const overlayClassName = computed(() =>
  ['modifier-dropdown-overlay', props.isLightMode && 'modifier-dropdown-overlay--light']
    .filter(Boolean)
    .join(' '),
)

const handleMenuClick = (e) => {
  let modifier = e.key
  if (modifier === 'default') {
    currentModifier.value = ''
    emit('modifierChange', '')
  } else {
    currentModifier.value = modifier
    emit('modifierChange', modifier)
  }
}
</script>

<style lang="less" scoped>
.demo-dropdown-wrap :deep(.ant-dropdown-trigger) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.demo-dropdown-wrap {
  top: 20px;
  right: 100px;
}

.demo-dropdown-wrap :deep(.ant-btn) {
  min-width: 120px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #555;
  color: #d9d9d9;
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition:
    transform 0.2s ease,
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.demo-dropdown-wrap :deep(.ant-btn:hover),
.demo-dropdown-wrap :deep(.ant-btn:focus-visible) {
  color: #ffffff;
  border-color: #6a6a6a;
  background: linear-gradient(to bottom, #454545, #353535);
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.demo-dropdown-wrap :deep(.ant-btn:active) {
  transform: translateY(1px);
}

.demo-dropdown-wrap :deep(.ant-btn .anticon) {
  font-size: 12px;
}

:global(.modifier-dropdown-overlay .ant-dropdown-menu) {
  padding: 6px;
  border: 1px solid #4a4a4a;
  border-radius: 12px;
  background: #232323;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

:global(.modifier-dropdown-overlay .ant-dropdown-menu-item) {
  min-width: 110px;
  margin: 0;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

:global(.modifier-dropdown-overlay .ant-dropdown-menu-item),
:global(.modifier-dropdown-overlay .ant-dropdown-menu-item a),
:global(.modifier-dropdown-overlay .ant-dropdown-menu-item .anticon),
:global(.modifier-dropdown-overlay .ant-dropdown-menu-item .ant-menu-title-content),
:global(.modifier-dropdown-overlay .ant-dropdown-menu-item span) {
  color: #ffffff !important;
}

:global(.modifier-dropdown-overlay .ant-dropdown-menu-item:hover),
:global(.modifier-dropdown-overlay .ant-dropdown-menu-item-active) {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.08) !important;
}

.modifier-dropdown-overlay--light :global(.ant-dropdown-menu) {
  border-color: #d8d8d8;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
}

.modifier-dropdown-overlay--light :global(.ant-dropdown-menu-item) {
  color: #1f1f1f;
}

.modifier-dropdown-overlay--light :global(.ant-dropdown-menu-item:hover),
.modifier-dropdown-overlay--light :global(.ant-dropdown-menu-item-active) {
  color: #000000 !important;
  background: #f2f6fa !important;
}
</style>
