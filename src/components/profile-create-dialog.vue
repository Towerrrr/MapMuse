<template>
  <div class="profile-create-dialog" role="presentation" @click.self="emit('close')">
    <section class="profile-create-dialog__panel" role="dialog" aria-modal="true" aria-label="新增菜单项">
      <div class="profile-create-dialog__header">
        <div>
          <p class="profile-create-dialog__eyebrow">新增菜单项</p>
          <h3 class="profile-create-dialog__title">自定义菜单项</h3>
        </div>

        <div class="profile-create-dialog__preview" aria-hidden="true">
          <img class="profile-create-dialog__preview-icon" :src="previewIcon" :alt="previewName" />
        </div>
      </div>

      <label class="profile-create-dialog__field">
        <span class="profile-create-dialog__label">菜单项键</span>
        <input
          v-model="formKey"
          class="profile-create-dialog__input"
          type="text"
          maxlength="40"
          placeholder="例如：Daily-Work"
        />
      </label>

      <label class="profile-create-dialog__field">
        <span class="profile-create-dialog__label">显示名称</span>
        <input
          v-model="formName"
          class="profile-create-dialog__input"
          type="text"
          maxlength="24"
          placeholder="输入菜单显示名称"
        />
      </label>

      <label class="profile-create-dialog__field">
        <span class="profile-create-dialog__label">ICON 路径</span>
        <input
          v-model="formIcon"
          class="profile-create-dialog__input"
          type="text"
          placeholder="/Terraria_icon.jfif 或图片链接"
        />
      </label>

      <p v-if="validationMessage" class="profile-create-dialog__hint profile-create-dialog__hint--error">
        {{ validationMessage }}
      </p>
      <p v-else class="profile-create-dialog__hint">菜单项键会直接作为保存标识，请确保不重复。</p>

      <div class="profile-create-dialog__actions">
        <button type="button" class="profile-create-dialog__button" @click="emit('close')">取消</button>
        <button
          type="button"
          class="profile-create-dialog__button profile-create-dialog__button--primary"
          :disabled="!canSubmit"
          @click="submit"
        >
          新增
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DEFAULT_ICON = '/Terraria_icon.jfif'

const props = defineProps({
  existingKeys: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['close', 'create'])

const formKey = ref('')
const formName = ref('')
const formIcon = ref(DEFAULT_ICON)

const previewIcon = computed(() => formIcon.value.trim() || DEFAULT_ICON)
const previewName = computed(() => formName.value.trim() || formKey.value.trim() || '新菜单项')
const normalizedExistingKeys = computed(() => new Set(props.existingKeys.map((item) => String(item).trim())))
const isDuplicateKey = computed(() => normalizedExistingKeys.value.has(formKey.value.trim()))
const canSubmit = computed(() => formKey.value.trim().length > 0 && !isDuplicateKey.value)
const validationMessage = computed(() => {
  if (!formKey.value.trim()) {
    return '请输入菜单项键。'
  }

  if (isDuplicateKey.value) {
    return '这个菜单项键已存在，请换一个。'
  }

  return ''
})

function submit() {
  if (!canSubmit.value) {
    return
  }

  emit('create', {
    key: formKey.value.trim(),
    name: formName.value.trim(),
    icon: formIcon.value.trim() || DEFAULT_ICON,
  })
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    emit('close')
  }

  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    submit()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  formIcon.value = DEFAULT_ICON
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.profile-create-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(3, 5, 8, 0.72);
  backdrop-filter: blur(10px);
}

.profile-create-dialog__panel {
  width: min(460px, 100%);
  padding: 20px;
  border: 1px solid #404854;
  border-radius: 18px;
  background: linear-gradient(to bottom, rgba(24, 28, 33, 0.98), rgba(14, 17, 21, 0.98));
  color: #ecf0f4;
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.profile-create-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.profile-create-dialog__eyebrow {
  margin: 0 0 4px;
  color: #91a0af;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.profile-create-dialog__title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.profile-create-dialog__preview {
  width: 58px;
  height: 58px;
  flex: 0 0 58px;
  padding: 7px;
  border-radius: 16px;
  border: 1px solid #4a5562;
  background: linear-gradient(to bottom, #2f353c, #181d22);
}

.profile-create-dialog__preview-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-create-dialog__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.profile-create-dialog__label {
  color: #b9c3ce;
  font-size: 12px;
  letter-spacing: 0.03em;
}

.profile-create-dialog__input {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border-radius: 11px;
  border: 1px solid #45505b;
  background: rgba(255, 255, 255, 0.04);
  color: #f4f7fa;
  outline: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.profile-create-dialog__input:focus {
  border-color: #6a7684;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.06);
}

.profile-create-dialog__hint {
  margin: 0 0 16px;
  color: #95a1af;
  font-size: 12px;
  line-height: 1.5;
}

.profile-create-dialog__hint--error {
  color: #f2a6a6;
}

.profile-create-dialog__actions {
  display: flex;
  gap: 10px;
}

.profile-create-dialog__button {
  flex: 1;
  height: 40px;
  border-radius: 11px;
  border: 1px solid #46505a;
  background: linear-gradient(to bottom, #2f353c, #20252b);
  color: #edf1f5;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease;
}

.profile-create-dialog__button:hover,
.profile-create-dialog__button:focus-visible {
  border-color: #66707c;
  background: linear-gradient(to bottom, #38414c, #232931);
  outline: none;
}

.profile-create-dialog__button:active {
  transform: translateY(1px);
}

.profile-create-dialog__button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.profile-create-dialog__button--primary {
  border-color: #6a7684;
  background: linear-gradient(to bottom, #44505d, #2b323a);
}
</style>
