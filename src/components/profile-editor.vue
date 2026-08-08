<template>
  <section class="profile-editor" :class="{ 'profile-editor--light': isLightMode }" aria-label="当前配置编辑器">
    <div class="profile-editor__header">
      <div>
        <p class="profile-editor__eyebrow">当前配置</p>
        <h3 class="profile-editor__title">{{ profileKey }}</h3>
      </div>
      <div class="profile-editor__preview">
        <img class="profile-editor__preview-icon" :src="previewIcon" :alt="localName || profileKey" />
      </div>
    </div>

    <label class="profile-editor__field">
      <span class="profile-editor__label">名称</span>
      <input v-model="localName" class="profile-editor__input" type="text" maxlength="24" placeholder="输入配置名称" />
    </label>

    <label class="profile-editor__field">
      <span class="profile-editor__label">ICON 路径</span>
      <input
        v-model="localIcon"
        class="profile-editor__input"
        type="text"
        placeholder="/Terraria_icon.jfif 或图片链接"
      />
    </label>

    <p class="profile-editor__hint">支持本地资源路径或远程图片地址。</p>

    <div class="profile-editor__actions">
      <button type="button" class="profile-editor__button" @click="resetToDefault">恢复默认</button>
      <button type="button" class="profile-editor__button profile-editor__button--primary" @click="applyChanges">保存修改</button>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  isLightMode: {
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

const emit = defineEmits(['update'])

const defaultIcon = '/Terraria_icon.jfif'
const localName = ref('')
const localIcon = ref('')

watch(
  () => [props.profileName, props.profileIcon, props.profileKey],
  ([profileName, profileIcon, profileKey]) => {
    localName.value = profileName || profileKey || ''
    localIcon.value = profileIcon || defaultIcon
  },
  { immediate: true },
)

const previewIcon = computed(() => localIcon.value || defaultIcon)

function applyChanges() {
  emit('update', {
    name: localName.value.trim() || props.profileKey,
    icon: localIcon.value.trim() || defaultIcon,
  })
}

function resetToDefault() {
  localName.value = props.profileKey
  localIcon.value = defaultIcon
  applyChanges()
}
</script>

<style scoped>
.profile-editor {
  width: 260px;
  padding: 16px;
  border: 1px solid #3e454d;
  border-radius: 16px;
  background: linear-gradient(to bottom, rgba(25, 29, 34, 0.96), rgba(17, 20, 24, 0.96));
  color: #e7ebef;
  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

.profile-editor__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.profile-editor__eyebrow {
  margin: 0 0 4px;
  color: #8d97a4;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-editor__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.profile-editor__preview {
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  padding: 6px;
  border-radius: 14px;
  background: linear-gradient(to bottom, #2f353c, #1b2025);
  border: 1px solid #48525d;
}

.profile-editor__preview-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-editor__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.profile-editor__label {
  color: #b9c2cc;
  font-size: 12px;
  letter-spacing: 0.03em;
}

.profile-editor__input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid #434b55;
  background: rgba(255, 255, 255, 0.04);
  color: #f4f7fa;
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-editor__input:focus {
  border-color: #6a7684;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
}

.profile-editor__hint {
  margin: 0 0 14px;
  color: #8f98a3;
  font-size: 12px;
  line-height: 1.5;
}

.profile-editor__actions {
  display: flex;
  gap: 10px;
}

.profile-editor__button {
  flex: 1;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #46505a;
  background: linear-gradient(to bottom, #2f353c, #20252b);
  color: #edf1f5;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.profile-editor__button:hover,
.profile-editor__button:focus-visible {
  border-color: #66707c;
  background: linear-gradient(to bottom, #38414c, #232931);
  outline: none;
}

.profile-editor__button:active {
  transform: translateY(1px);
}

.profile-editor__button--primary {
  border-color: #6a7684;
  background: linear-gradient(to bottom, #44505d, #2b323a);
}

.profile-editor--light {
  border-color: #d0d7df;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.98), rgba(241, 244, 248, 0.98));
  color: #17202a;
  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.profile-editor--light .profile-editor__eyebrow,
.profile-editor--light .profile-editor__label,
.profile-editor--light .profile-editor__hint {
  color: #5d6875;
}

.profile-editor--light .profile-editor__preview {
  border-color: #cad2db;
  background: linear-gradient(to bottom, #ffffff, #e9edf3);
}

.profile-editor--light .profile-editor__input {
  border-color: #cfd6de;
  background: rgba(255, 255, 255, 0.9);
  color: #17202a;
}

.profile-editor--light .profile-editor__input:focus {
  border-color: #aeb7c1;
  box-shadow: 0 0 0 3px rgba(65, 76, 89, 0.08);
}

.profile-editor--light .profile-editor__button {
  border-color: #c2c9d1;
  background: linear-gradient(to bottom, #ffffff, #e8edf3);
  color: #17202a;
}

.profile-editor--light .profile-editor__button:hover,
.profile-editor--light .profile-editor__button:focus-visible {
  border-color: #aeb7c1;
  background: linear-gradient(to bottom, #f7f9fb, #dde3ea);
}

.profile-editor--light .profile-editor__button--primary {
  border-color: #a8b1ba;
  background: linear-gradient(to bottom, #eef2f6, #d9e0e8);
}
</style>
