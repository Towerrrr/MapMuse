<template>
  <div class="keyboard-right-panel">
    <div class="right-row">
      <key
        v-for="keyLabel in systemKeys"
        :key="keyLabel"
        :keyName="keyLabel"
        :keyFunctions="currentKeyFunctions"
        :modifier="currentModifier"
        @save="emit('save', $event)"
      >
        {{ keyLabel }}
      </key>
    </div>

    <div class="right-auxiliary">
      <div class="right-keys">
        <div class="right-row" v-for="navRow in navKeys" :key="navRow[0]">
          <key
            v-for="keyLabel in navRow"
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

      <div class="right-keys">
        <div class="right-row" v-for="directionRow in directionKeys" :key="directionRow[0]">
          <key
            v-for="keyLabel in directionRow"
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
    </div>
  </div>
</template>

<script setup>
import key from '@/components/key.vue'

defineProps({
  systemKeys: {
    type: Array,
    required: true,
  },
  navKeys: {
    type: Array,
    required: true,
  },
  directionKeys: {
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
.keyboard-right-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.right-auxiliary {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.right-keys {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

.right-row {
  display: flex;
  gap: 6px;
}
</style>
