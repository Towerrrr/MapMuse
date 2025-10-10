<template>
  <div class="keyboard-container" :class="{ 'dark-mode': isDarkMode }">
    <button class="theme-toggle" @click="toggleTheme">
      <span v-if="isDarkMode">☀️</span>
      <span v-else>🌙</span>
    </button>

    <div class="keyboard">
      <div class="keyboard-left">
        <!-- 功能键区域 -->
        <div class="keyboard-row function-keys">
          <button class="key">Esc</button>
          <div class="keyboard-row">
            <button class="key" v-for="key in functionKeys1" :key="key">
              {{ key }}
            </button>
          </div>
          <div class="keyboard-row">
            <button class="key" v-for="key in functionKeys2" :key="key">
              {{ key }}
            </button>
          </div>
          <div class="keyboard-row">
            <button class="key" v-for="key in functionKeys3" :key="key">
              {{ key }}
            </button>
          </div>
        </div>
        <!-- 第一行 -->
        <div class="keyboard-row">
          <button class="key" v-for="key in row1" :key="key.main">
            <span class="key-symbol">{{ key.symbol }}</span>
            <span class="key-main">{{ key.main }}</span>
          </button>
          <button class="key key-backspace">Backspace</button>
        </div>

        <!-- 第二行 -->
        <div class="keyboard-row">
          <button class="key key-tab">Tab</button>
          <button class="key" v-for="key in row2" :key="key.main">
            <span class="key-main">{{ key.main }}</span>
          </button>
          <button class="key">
            <span class="key-main">|</span>
            <span class="key-symbol">\</span>
          </button>
        </div>

        <!-- 第三行 -->
        <div class="keyboard-row">
          <button class="key key-caps">Caps Lock</button>
          <button class="key" v-for="key in row3" :key="key.main">
            <span class="key-main">{{ key.main }}</span>
            <span v-if="key.dot" class="key-dot">•</span>
          </button>
          <button class="key">
            <span class="key-main">:</span>
            <span class="key-symbol">;</span>
          </button>
          <button class="key">
            <span class="key-main">"</span>
            <span class="key-symbol">'</span>
          </button>
          <button class="key key-enter">Enter</button>
        </div>

        <!-- 第四行 -->
        <div class="keyboard-row">
          <button class="key key-shift">Shift</button>
          <button class="key" v-for="key in row4" :key="key.main">
            <span class="key-main">{{ key.main }}</span>
          </button>
          <button class="key">
            <span class="key-main"><</span>
            <span class="key-symbol">,</span>
          </button>
          <button class="key">
            <span class="key-main">></span>
            <span class="key-symbol">.</span>
          </button>
          <button class="key">
            <span class="key-main">?</span>
            <span class="key-symbol">/</span>
          </button>
          <button class="key key-shift">Shift</button>
        </div>

        <!-- 第五行 -->
        <div class="keyboard-row">
          <button class="key key-ctrl">Ctrl</button>
          <button class="key key-alt">Alt</button>
          <button class="key key-space"></button>
          <button class="key key-alt">Alt</button>
          <button class="key key-ctrl">Ctrl</button>
        </div>
      </div>

      <!-- 键盘右侧区域 -->
      <div class="keyboard-right">
        <div class="right-row">
          <button class="key" v-for="key in systemKeys" :key="key">
            {{ key }}
          </button>
        </div>
        <!-- 导航键区域 -->
        <div class="right-keys">
            <div class="right-row">
              <button class="key" v-for="key in navKeys1" :key="key">
                {{ key }}
              </button>
            </div>
            <div class="right-row">
              <button class="key" v-for="key in navKeys2" :key="key">
                {{ key }}
              </button>
            </div>
        </div>

        <!-- 方向键 -->
        <div class="right-keys">
          <div class="right-row">
            <button class="key">↑</button>
          </div>
          <div class="right-row">
            <button class="key">←</button>
            <button class="key">↓</button>
            <button class="key">→</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 鼠标部分 -->
    <div class="mouse-section">
      <div class="side-buttons">
        <div class="key"></div>
        <div class="key"></div>
      </div>
      <div class="mouse">
        <div class="mouse-buttons">
          <button class="mouse-btn left-btn">
            <span class="btn-label"></span>
          </button>
          <div class="mouse-wheel">
            <div class="wheel-scroll"></div>
          </div>
          <button class="mouse-btn right-btn">
            <span class="btn-label"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyboardView',
  data() {
    return {
      isDarkMode: false,
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
        { main: '{', symbol: '[' },
        { main: '}', symbol: ']' },
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
      ],
      row4: [
        { main: 'Z' },
        { main: 'X' },
        { main: 'C' },
        { main: 'V' },
        { main: 'B' },
        { main: 'N' },
        { main: 'M' },
      ],
      functionKeys1: ['F1', 'F2', 'F3', 'F4',],
      functionKeys2: ['F5', 'F6', 'F7', 'F8'],
      functionKeys3: ['F9', 'F10', 'F11', 'F12'],
      systemKeys: ['PrtSc', 'ScrLk', 'Pause'],
      navKeys1: ['Ins', 'Home', 'PgUp'],
      navKeys2: ['Del', 'End', 'PgDn'],
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
    }
  }
}
</script>

<style scoped>
.keyboard-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  gap: 40px;
  position: relative;
  transition: background-color 0.3s ease;
}

.theme-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 10;
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.theme-toggle:active {
  transform: scale(0.95);
}

.keyboard {
  display: flex;
  background: linear-gradient(to bottom, #e8e8e8, #d8d8d8);
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: background 0.3s ease;
}

.keyboard-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.keyboard-row {
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.key {
  position: relative;
  min-width: 60px;
  height: 60px;
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 8px;
  transition: all 0.3s ease;
}

.key:hover {
  background: linear-gradient(to bottom, #f8f8f8, #e8e8e8);
}

.key:active {
  transform: translateY(2px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.key-symbol {
  font-size: 12px;
  color: #666;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  transition: color 0.3s ease;
}

.key-main {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;
}

.key-dot {
  position: absolute;
  bottom: 12px;
  font-size: 20px;
  color: #666;
  transition: color 0.3s ease;
}

/* 特殊按键样式 */
.key-backspace,
.key-tab,
.key-caps,
.key-enter,
.key-shift,
.key-ctrl,
.key-alt {
  font-size: 13px;
  color: #555;
  font-weight: 500;
  transition: color 0.3s ease;
}

.key-backspace {
  flex: 1.5;
}

.key-tab {
  flex: 1.3;
}

.key-caps {
  flex: 1.6;
}

.key-enter {
  flex: 1.8;
}

.key-shift {
  flex: 2;
}

.key-ctrl,
.key-alt {
  flex: 1.2;
}

.key-space {
  flex: 5;
}

/* 功能键区域样式 */
.function-keys {
  display: flex;
  justify-content: space-between;
}

/* 右侧区域键样式 */
.right-keys {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
}

/* 右侧区域行样式 */
.right-row {
  display: flex;
  gap: 6px;
}

/* region 鼠标样式 */
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

.mouse {
  width: 100px;
  height: 160px;
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  border-radius: 50px 50px 50px 50px;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 8px;
  transition: all 0.3s ease;
}

.mouse-buttons {
  display: flex;
  gap: 4px;
  height: 70px;
  position: relative;
}

.mouse-btn {
  flex: 1;
  background: linear-gradient(to bottom, #fafafa, #e8e8e8);
  border: 1px solid #d0d0d0;
  transition: all 0.3s ease;
}

.mouse-btn:hover {
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
}

.mouse-btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.left-btn {
  border-radius: 40px 0 0 0;
  border-right: 0.5px solid #d0d0d0;
}

.right-btn {
  border-radius: 0 40px 0 0;
  border-left: 0.5px solid #d0d0d0;
}

.btn-label {
  font-size: 11px;
  color: #666;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.mouse-wheel {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
  width: 20px;
  height: 50px;
  background: linear-gradient(to bottom, #e0e0e0, #d0d0d0);
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
  z-index: 1;
  transition: all 0.3s ease;
}

.wheel-scroll {
  width: 8px;
  height: 18px;
  background: linear-gradient(to bottom, #999, #777);
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

/* 夜间模式样式 */
.dark-mode {
  background-color: #1a1a1a;
}

.dark-mode .theme-toggle {
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  border-color: #555;
}

.dark-mode .keyboard {
  background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
}

.dark-mode .key {
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  border-color: #555;
  color: #e0e0e0;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark-mode .key:hover {
  background: linear-gradient(to bottom, #454545, #353535);
}

.dark-mode .key-symbol {
  color: #aaa;
}

.dark-mode .key-main {
  color: #e0e0e0;
}

.dark-mode .key-dot {
  color: #aaa;
}

.dark-mode .key-backspace,
.dark-mode .key-tab,
.dark-mode .key-caps,
.dark-mode .key-enter,
.dark-mode .key-shift,
.dark-mode .key-ctrl,
.dark-mode .key-alt {
  color: #bbb;
}

.dark-mode .mouse {
  background: linear-gradient(to bottom, #3a3a3a, #2a2a2a);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.dark-mode .mouse-btn {
  background: linear-gradient(to bottom, #454545, #353535);
  border-color: #555;
}

.dark-mode .mouse-btn:hover {
  background: linear-gradient(to bottom, #505050, #404040);
}

.dark-mode .left-btn,
.dark-mode .right-btn {
  border-color: #555;
}

.dark-mode .mouse-wheel {
  background: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
  border-color: #444;
}

.dark-mode .wheel-scroll {
  background: linear-gradient(to bottom, #666, #555);
}

/** endregion */

</style>
