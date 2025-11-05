<template>
  <div class="key" @click="handleClick">
    <slot></slot>
    <div v-if="isEditing" class="function-text">
      <input
        v-model="editText"
        @blur="save"
        @keyup.enter="save"
        ref="editInput"
        style="width: 50px; background: transparent; outline: none; border: none"
      />
    </div>
    <div v-else-if="keyFunctions && keyFunctions[keyName]" class="function-text">
      <template v-if="modifier">
        <div v-if="keyFunctions[keyName][modifier]">
          {{ keyFunctions[keyName][modifier] }}
        </div>
      </template>
      <template v-else>
        <div v-for="(text, name) in keyFunctions[keyName]" :key="name">
          {{ text }}
        </div>
      </template>
    </div>
  </div>

  <!-- todo 气泡示例（父组件使用示例） -->
  <!-- <popover :content="keyFunctions['Caps Lock']">
  <template #default>
    <key style="flex: 1.6">
      Caps Lock
      <div class="function-text" v-if="keyFunctions['Caps Lock']">
        {{ keyFunctions['Caps Lock'] }}
      </div>
    </key>
  </template>
</popover> -->
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  keyName: String,
  keyFunctions: Object,
  modifier: String,
})
const emit = defineEmits(['save'])

const isEditing = ref(false)
const editingField = ref('Main')
const editText = ref('')
const editInput = ref(null)

function handleClick() {
  editingField.value = 'Main'
  isEditing.value = true
  editText.value = props.keyFunctions?.[props.keyName]?.Main || ''
  nextTick(() => {
    editInput.value && editInput.value.focus()
  })
}

function save() {
  isEditing.value = false
  emit('save', {
    keyName: props.keyName,
    field: editingField.value,
    text: editText.value
  })
}

</script>

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

.function-text {
  color: #8685ef;
  font-size: 11px;
  text-align: center;
}
</style>
