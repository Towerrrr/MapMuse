<template>
  <div class="keyboard-container" :class="{ 'light-mode': isLightMode }">
    <theme-toggle :isLightMode="isLightMode" @update:isLightMode="isLightMode = $event" />

    <div class="keyboard">
      <div class="keyboard-left">
        <!-- 功能键区域 -->
        <div class="keyboard-row function-keys">
          <key>Esc</key>
          <div class="keyboard-row">
            <key v-for="key in functionKeys1" :key="key">
              {{ key }}
            </key>
          </div>
          <div class="keyboard-row">
            <key v-for="key in functionKeys2" :key="key">
              {{ key }}
            </key>
          </div>
          <div class="keyboard-row">
            <key v-for="key in functionKeys3" :key="key">
              {{ key }}
            </key>
          </div>
        </div>
        <!-- 第一行 -->
        <div class="keyboard-row">
          <key v-for="key in row1" :key="key.main">
            <div>{{ key.main }} {{ key.symbol }}</div>
          </key>
          <key style="flex: 1.5">Backspace</key>
        </div>

        <!-- 第二行 -->
        <div class="keyboard-row">
          <key style="flex: 1.3">Tab</key>
          <key v-for="key in row2" :key="key.main">
            <div>{{ key.main }} {{ key.symbol }}</div>
          </key>
          <key>
            <div>\ |</div>
          </key>
        </div>

        <!-- 第三行 -->
        <div class="keyboard-row">
          <popover :content="keyFunctions['Caps Lock']">
            <template #default>
              <key style="flex: 1.6">
                Caps Lock
                <div class="function-text" v-if="keyFunctions['Caps Lock']">
                  {{ keyFunctions['Caps Lock'] }}
                </div>
              </key>
            </template>
          </popover>

          <key v-for="key in row3" :key="key.main" @click="startEdit(key.main)">
            <div>{{ key.main }} {{ key.symbol }}</div>
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

          <key style="flex: 1.8">Enter</key>
        </div>

        <!-- 第四行 -->
        <div class="keyboard-row">
          <key style="flex: 2">Shift</key>
          <key v-for="key in row4" :key="key.main">
            <div>{{ key.main }} {{ key.symbol }}</div>
          </key>
          <key style="flex: 2">Shift</key>
        </div>

        <!-- 第五行 -->
        <div class="keyboard-row">
          <key style="flex: 1.2">Ctrl</key>
          <key style="flex: 1.2">Alt</key>
          <key style="flex: 5"></key>
          <key style="flex: 1.2">Alt</key>
          <key style="flex: 1.2">Ctrl</key>
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
            <div class="right-row">
              <key v-for="key in navKeys1" :key="key">
                {{ key }}
              </key>
            </div>
            <div class="right-row">
              <key v-for="key in navKeys2" :key="key">
                {{ key }}
              </key>
            </div>
          </div>

          <!-- 方向键 -->
          <div class="right-keys">
            <div class="right-row">
              <key>↑</key>
            </div>
            <div class="right-row">
              <key>←</key>
              <key>↓</key>
              <key>→</key>
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
import Popover from '@/components/popover.vue'

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
      row1: [
        { symbol: '~', main: '`' },
        { symbol: '!', main: '1' },
        { symbol: '@', main: '2' },
        { symbol: '#', main: '3' },
        { symbol: '$', main: '4' },
        { symbol: '%', main: '5' },
        { symbol: '^', main: '6' },
        { symbol: '&', main: '7' },
        { symbol: '*', main: '8' },
        { symbol: '(', main: '9' },
        { symbol: ')', main: '0' },
        { symbol: '_', main: '-' },
        { symbol: '+', main: '=' },
      ],
      row2: [
        { main: 'Q' },
        { main: 'W' },
        { main: 'E' },
        { main: 'R' },
        { main: 'T' },
        { main: 'Y' },
        { main: 'U' },
        { main: 'I' },
        { main: 'O' },
        { main: 'P' },
        { main: '[', symbol: '{' },
        { main: ']', symbol: '}' },
      ],
      row3: [
        { main: 'A' },
        { main: 'S' },
        { main: 'D' },
        { main: 'F', dot: true },
        { main: 'G' },
        { main: 'H' },
        { main: 'J', dot: true },
        { main: 'K' },
        { main: 'L' },
        { main: ';', symbol: ':' },
        { main: "'", symbol: '"' },
      ],
      row4: [
        { main: 'Z' },
        { main: 'X' },
        { main: 'C' },
        { main: 'V' },
        { main: 'B' },
        { main: 'N' },
        { main: 'M' },
        { main: ',', symbol: '<' },
        { main: '.', symbol: '>' },
        { main: '/', symbol: '?' },
      ],
      functionKeys1: ['F1', 'F2', 'F3', 'F4'],
      functionKeys2: ['F5', 'F6', 'F7', 'F8'],
      functionKeys3: ['F9', 'F10', 'F11', 'F12'],
      systemKeys: ['PrtSc', 'ScrLk', 'Pause'],
      navKeys1: ['Ins', 'Home', 'PgUp'],
      navKeys2: ['Del', 'End', 'PgDn'],
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
