<template>
  <a-popover
    style="width: 500px"
    trigger="hover"
    :open="hovered"
    @openChange="handleHoverChange"
  >
  <!-- todo 背景颜色修改 -->
    <template #content>
      <slot name="content">
        <div>{{ content }}</div>
      </slot>
    </template>
    <a-popover trigger="click" :open="clicked" @openChange="handleClickChange">
      <template #content>
        <div>
          <slot name="content">
            <div>{{ content }}</div>
          </slot>
          <a @click="hide">Close</a>
        </div>
      </template>
      <slot></slot>
    </a-popover>
  </a-popover>
</template>
<script setup>
import { ref } from 'vue';
const clicked = ref(false);
const hovered = ref(false);

defineProps({
  content: String,
})

const hide = () => {
  clicked.value = false;
  hovered.value = false;
};
const handleHoverChange = visible => {
  clicked.value = false;
  hovered.value = visible;
};
const handleClickChange = visible => {
  clicked.value = visible;
  hovered.value = false;
};
</script>