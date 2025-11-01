<template>
  <div class="keyboard-container" :class="{ 'light-mode': isLightMode }">
    <theme-toggle :isLightMode="isLightMode" @update:isLightMode="isLightMode = $event" />

    <div class="keyboard">
      <div class="keyboard-left">
        <!-- 功能键区域 -->
        <div class="keyboard-row function-keys">
          <div class="keyboard-row" v-for="functionRow in functionKeys">
            <key v-for="key in functionRow" :key="key">
              {{ key }}
            </key>
          </div>
        </div>

        <!-- 主键区 -->
        <div class="keyboard-row" v-for="row in rows">
          <key
            v-for="key in row"
            :style="key.flex ? { flex: key.flex } : null"
            @click="startEdit(key.main)"
          >
            <div>
              {{ key.main }}
              <span v-if="key.symbol"> {{ key.symbol }}</span>
            </div>

            <div class="function-text" v-if="editingKey === key.main">
              <input
                v-model="editText"
                @blur="saveFunctionText(key.main)"
                @keyup.enter="saveFunctionText(key.main)"
                style="width: 50px;background-color: transparent; outline: none; border: none;"
              />
            </div>
            <div
              class="function-text"
              v-else-if="keyFunctions[key.main]"
            >
              {{ keyFunctions[key.main] }}
            </div>

            <span v-if="key.dot" class="key-dot">•</span>
          </key>
        </div>
      </div>

      <!-- 键盘右侧区域 -->
      <div class="keyboard-right">
        <div class="right-row">
          <key v-for="key in systemKeys" :key="key">
            {{ key }}
          </key>
        </div>
        <!-- 辅助定位 -->
        <div class="right-auxiliary">
          <!-- 导航键区域 -->
          <div class="right-keys">
            <div class="right-row" v-for="navRow in navKeys">
              <key v-for="key in navRow" :key="key">
                {{ key }}
              </key>
            </div>
          </div>

          <!-- 方向键 -->
          <div class="right-keys">
            <div class="right-row" v-for="directionRow in directionKeys">
              <key v-for="key in directionRow" :key="key">{{ key }}</key>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mouse-section">
      <div class="side-buttons">
        <key></key>
        <key></key>
      </div>
      <mouse />
    </div>
  </div>
</template>

<script>
import mouse from '@/components/mouse.vue'
import themeToggle from '@/components/theme-toggle.vue'
import key from '@/components/key.vue'
import popover from '@/components/popover.vue'
import keyboardLayout from '@/data/keyboard-layout.json'

export default {
  name: 'KeyboardView',
  components: {
    mouse,
    themeToggle,
    key,
    popover,
  },
  data() {
    return {
      isLightMode: false,
      editingKey: null,
      ...keyboardLayout,
      keyFunctions: {},
    }
  },
  mounted() {
    this.keyFunctions = window.electronAPI.loadKeyFunctions()
  },
  methods: {
    startEdit(keyName) {
      this.editingKey = keyName
      this.editText = this.keyFunctions[keyName] || ''
      this.$nextTick(() => {
        this.$refs.editInput && this.$refs.editInput.focus()
      })
    },
    saveFunctionText(keyName) {
      if (this.editingKey) {
        if (this.editText.trim() !== '') {
          this.keyFunctions[keyName] = this.editText
        } else {
          delete this.keyFunctions[keyName]
        }
        if (window.electronAPI && window.electronAPI.saveKeyFunctions) {
          const rawKeyFunctions = JSON.parse(JSON.stringify(this.keyFunctions))
          window.electronAPI.saveKeyFunctions(rawKeyFunctions)
        }
        this.editingKey = null
        this.editText = ''
      }
    }
  },
}
</script>

<style scoped>
@import '../assets/light-theme.css';

.function-text {
  color: #8685ef;
  font-size: 11px;
  text-align: center;
}

.keyboard-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1a1a1a;
  padding: 20px;
  gap: 40px;
  position: relative;
  transition: background-color 0.3s ease;
}

.keyboard {
  display: flex;
  background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
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

/* 功能键区域 */
.function-keys {
  display: flex;
  justify-content: space-between;
}

/* 右侧区域 */
.keyboard-right {
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

/* 鼠标 */
.mouse-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.side-buttons {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 日间模式 */
.light-mode {
  background-color: #f5f5f5;
}
</style>
