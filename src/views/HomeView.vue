<template>
  <div class="home-view" :class="{ 'light-mode': isLightMode }">
    <top-navigation
      :isLightMode="isLightMode"
      :activeKey="currentProfile"
      @select="selectProfile"
    />

    <div class="keyboard-container">
      <theme-toggle :isLightMode="isLightMode" @update:isLightMode="isLightMode = $event" />
      <dropdown :isLightMode="isLightMode" @modifierChange="currentModifier = $event" />

      <div class="keyboard">
        <div class="keyboard-left">
          <!-- 功能键区域 -->
          <div class="keyboard-row function-keys">
            <div class="keyboard-row" v-for="functionRow in functionKeys">
              <key
                v-for="key in functionRow"
                :keyName="key"
                :keyFunctions="currentKeyFunctions"
                :modifier="currentModifier"
                @save="saveFunctionText"
              >
                {{ key }}
              </key>
            </div>
          </div>

          <!-- 主键区 -->
          <div class="keyboard-row" v-for="row in rows">
            <key
              v-for="key in row"
              :keyName="key.main"
              :keyFunctions="currentKeyFunctions"
              :style="key.flex ? { flex: key.flex } : null"
              :modifier="currentModifier"
              @save="saveFunctionText"
            >
              <div>
                {{ key.main }}
                <span v-if="key.symbol"> {{ key.symbol }}</span>
              </div>

              <span v-if="key.dot" class="key-dot">•</span>
            </key>
          </div>
        </div>

        <!-- 键盘右侧区域 -->
        <div class="keyboard-right">
          <div class="right-row">
            <key
              v-for="key in systemKeys"
              :keyName="key"
              :keyFunctions="currentKeyFunctions"
              :modifier="currentModifier"
              @save="saveFunctionText"
            >
              {{ key }}
            </key>
          </div>
          <!-- 辅助定位 -->
          <div class="right-auxiliary">
            <!-- 导航键区域 -->
            <div class="right-keys">
              <div class="right-row" v-for="navRow in navKeys">
                <key
                  v-for="key in navRow"
                  :keyName="key"
                  :keyFunctions="currentKeyFunctions"
                  :modifier="currentModifier"
                  @save="saveFunctionText"
                >
                  {{ key }}
                </key>
              </div>
            </div>

            <!-- 方向键 -->
            <div class="right-keys">
              <div class="right-row" v-for="directionRow in directionKeys">
                <key
                  v-for="key in directionRow"
                  :keyName="key"
                  :keyFunctions="currentKeyFunctions"
                  :modifier="currentModifier"
                  @save="saveFunctionText"
                  >{{ key }}</key
                >
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
  </div>
</template>

<script>
import mouse from '@/components/mouse.vue'
import themeToggle from '@/components/theme-toggle.vue'
import key from '@/components/key.vue'
import popover from '@/components/popover.vue'
import keyboardLayout from '@/data/keyboard-layout.json'
import dropdown from '@/components/dropdown.vue'
import topNavigation from '@/components/top-navigation.vue'

const DEFAULT_PROFILES = ['Daily', 'CS', 'Terraria', 'ARK']

function createEmptyProfiles() {
  return DEFAULT_PROFILES.reduce((profiles, profileName) => {
    profiles[profileName] = {}
    return profiles
  }, {})
}

function normalizeKeyFunctions(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      activeProfile: 'Daily',
      profiles: createEmptyProfiles(),
    }
  }

  if ('profiles' in data) {
    const normalizedProfiles = {
      ...createEmptyProfiles(),
      ...(data.profiles && typeof data.profiles === 'object' && !Array.isArray(data.profiles) ? data.profiles : {}),
    }

    return {
      activeProfile:
        typeof data.activeProfile === 'string' && data.activeProfile in normalizedProfiles
          ? data.activeProfile
          : 'Daily',
      profiles: normalizedProfiles,
    }
  }

  return {
    activeProfile: 'Daily',
    profiles: {
      Daily: data,
      CS: {},
      Terraria: {},
      ARK: {},
    },
  }
}

export default {
  name: 'KeyboardView',
  components: {
    mouse,
    themeToggle,
    key,
    popover,
    dropdown,
    topNavigation,
  },
  data() {
    return {
      isLightMode: false,
      editingKey: null,
      ...keyboardLayout,
      keyFunctions: {
        activeProfile: 'Daily',
        profiles: createEmptyProfiles(),
      },
      currentModifier: '',
    }
  },
  computed: {
    currentProfile() {
      return this.keyFunctions.activeProfile
    },
    currentKeyFunctions() {
      return this.keyFunctions.profiles[this.currentProfile] || {}
    },
  },
  mounted() {
    this.keyFunctions = normalizeKeyFunctions(window.electronAPI.loadKeyFunctions())
  },
  methods: {
    selectProfile(profileName) {
      if (this.keyFunctions.profiles[profileName]) {
        this.keyFunctions.activeProfile = profileName
        window.electronAPI.saveKeyFunctions(JSON.parse(JSON.stringify(this.keyFunctions)))
      }
    },
    saveFunctionText({ keyName, field, text }) {
      const profileFunctions = this.currentKeyFunctions

      if (text.trim() !== '') {
        profileFunctions[keyName] = profileFunctions[keyName] || {}
        profileFunctions[keyName][field] = text
      } else if (profileFunctions[keyName]) {
        delete profileFunctions[keyName][field]
        if (Object.keys(profileFunctions[keyName]).length === 0) {
          delete profileFunctions[keyName]
        }
      }

      window.electronAPI.saveKeyFunctions(JSON.parse(JSON.stringify(this.keyFunctions)))
    },
  },
}
</script>

<style scoped>
@import '../assets/light-theme.css';

.keyboard-container {
  width: 100%;
  flex: 1;
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

.home-view {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
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
