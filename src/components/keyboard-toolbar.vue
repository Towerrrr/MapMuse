<template>
  <div class="keyboard-toolbar">
    <button class="keyboard-toolbar__profile-editor-toggle" type="button" @click="emit('toggle-profile-editor')">
      {{ isProfileEditorOpen ? '关闭配置编辑' : '编辑当前配置' }}
    </button>

    <profile-editor
      v-if="isProfileEditorOpen"
      class="keyboard-toolbar__profile-editor"
      :isLightMode="isLightMode"
      :profileKey="profileKey"
      :profileName="profileName"
      :profileIcon="profileIcon"
      @update="emit('update-profile-meta', $event)"
    />

    <div class="keyboard-toolbar__controls">
      <theme-toggle :isLightMode="isLightMode" @update:isLightMode="emit('update:isLightMode', $event)" />
      <dropdown :isLightMode="isLightMode" @modifierChange="emit('modifier-change', $event)" />
    </div>
  </div>
</template>

<script setup>
import dropdown from '@/components/dropdown.vue'
import profileEditor from '@/components/profile-editor.vue'
import themeToggle from '@/components/theme-toggle.vue'

defineProps({
  isLightMode: {
    type: Boolean,
    default: false,
  },
  isProfileEditorOpen: {
    type: Boolean,
    default: false,
  },
  profileKey: {
    type: String,
    default: '',
  },
  profileName: {
    type: String,
    default: '',
  },
  profileIcon: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['toggle-profile-editor', 'update-profile-meta', 'update:isLightMode', 'modifier-change'])
</script>

<style scoped>
.keyboard-toolbar {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
}

.keyboard-toolbar__profile-editor-toggle {
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid #4a525b;
  background: linear-gradient(to bottom, #313842, #20252b);
  color: #edf1f5;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.keyboard-toolbar__profile-editor-toggle:hover,
.keyboard-toolbar__profile-editor-toggle:focus-visible {
  border-color: #66707c;
  background: linear-gradient(to bottom, #3d4550, #262c33);
  outline: none;
}

.keyboard-toolbar__profile-editor-toggle:active {
  transform: translateY(1px);
}

.keyboard-toolbar__profile-editor {
  position: absolute;
  top: 52px;
  left: 0;
  z-index: 9;
}

.keyboard-toolbar__controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
