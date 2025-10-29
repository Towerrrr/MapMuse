<template>
  <div class="key" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.key {
  position: relative;
  min-width: 65px;
  height: 65px;
  padding: 0 4px;
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  border: 1px solid #555;
  border-radius: 6px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  color: #bbb;
  font-size: 13px;
  display: flex;
  flex-direction: column;
}

.key:hover {
  background: linear-gradient(to bottom, #454545, #353535);
}

.key:active {
  transform: translateY(2px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
