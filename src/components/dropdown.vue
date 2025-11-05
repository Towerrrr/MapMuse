<template>
  <div class="demo-dropdown-wrap">
    <a-dropdown>
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
import { ref } from 'vue'
const emit = defineEmits(['modifierChange'])
const currentModifier = ref('')

const handleMenuClick = e => {
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
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.demo-dropdown-wrap {
  position: absolute;
  top: 20px;
  right: 200px;
  width: 50px;
  height: 50px;
}

</style>