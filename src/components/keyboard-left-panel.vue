<template>
  <div class="keyboard-left-panel">
    <div class="keyboard-row function-keys">
      <div class="keyboard-row" v-for="functionRow in functionKeys" :key="functionRow[0]">
        <key
          v-for="keyLabel in functionRow"
          :key="keyLabel"
          :keyName="keyLabel"
          :keyFunctions="currentKeyFunctions"
          :modifier="currentModifier"
          @save="emit('save', $event)"
        >
          {{ keyLabel }}
        </key>
      </div>
    </div>

    <div class="keyboard-row" v-for="row in rows" :key="row[0].main">
      <key
        v-for="keyItem in row"
        :key="keyItem.main"
        :keyName="keyItem.main"
        :keyFunctions="currentKeyFunctions"
        :style="keyItem.flex ? { flex: keyItem.flex } : null"
        :modifier="currentModifier"
        @save="emit('save', $event)"
      >
        <div>
          {{ keyItem.main }}
          <span v-if="keyItem.symbol"> {{ keyItem.symbol }}</span>
        </div>

        <span v-if="keyItem.dot" class="key-dot">•</span>
      </key>
    </div>
  </div>
</template>

<script setup>
import key from '@/components/key.vue'

defineProps({
  functionKeys: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
  currentKeyFunctions: {
    type: Object,
    required: true,
  },
  currentModifier: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['save'])
</script>

<style scoped>
.keyboard-left-panel {
  display: flex;
  flex-direction: column;
}

.keyboard-row {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.key-dot {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.function-keys {
  display: flex;
  justify-content: space-between;
}
</style>
