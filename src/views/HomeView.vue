<template>
  <div class="home-view" :class="{ 'light-mode': isLightMode }">
    <top-navigation
      :isLightMode="isLightMode"
      :activeKey="currentProfile"
      :items="profileItems"
      @select="selectProfile"
    />

    <div class="keyboard-container">
      <keyboard-toolbar
        :isLightMode="isLightMode"
        :isProfileEditorOpen="isProfileEditorOpen"
        :profileKey="currentProfile"
        :profileName="currentProfileMeta.name"
        :profileIcon="currentProfileMeta.icon"
        @toggle-profile-editor="toggleProfileEditor"
        @update-profile-meta="updateCurrentProfileMeta"
        @update:isLightMode="isLightMode = $event"
        @modifier-change="currentModifier = $event"
      />

      <div class="keyboard">
        <keyboard-left-panel
          :functionKeys="functionKeys"
          :rows="rows"
          :currentKeyFunctions="currentKeyFunctions"
          :currentModifier="currentModifier"
          @save="saveFunctionText"
        />

        <keyboard-right-panel
          :systemKeys="systemKeys"
          :navKeys="navKeys"
          :directionKeys="directionKeys"
          :currentKeyFunctions="currentKeyFunctions"
          :currentModifier="currentModifier"
          @save="saveFunctionText"
        />
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
import key from '@/components/key.vue'
import popover from '@/components/popover.vue'
import keyboardLayout from '@/data/keyboard-layout.json'
import topNavigation from '@/components/top-navigation.vue'
import keyboardToolbar from '@/components/keyboard-toolbar.vue'
import keyboardLeftPanel from '@/components/keyboard-left-panel.vue'
import keyboardRightPanel from '@/components/keyboard-right-panel.vue'

const DEFAULT_PROFILES = ['Daily', 'CS', 'Terraria', 'ARK']

const DEFAULT_PROFILE_META = {
  Daily: {
    name: '日常',
    icon: '/Terraria_icon.jfif',
  },
  CS: {
    name: 'CS',
    icon: '/Terraria_icon.jfif',
  },
  Terraria: {
    name: '泰拉',
    icon: '/Terraria_icon.jfif',
  },
  ARK: {
    name: 'ARK',
    icon: '/Terraria_icon.jfif',
  },
}

function createEmptyProfiles() {
  return DEFAULT_PROFILES.reduce((profiles, profileName) => {
    profiles[profileName] = {}
    return profiles
  }, {})
}

function createDefaultProfileMeta() {
  return DEFAULT_PROFILES.reduce((profileMeta, profileName) => {
    profileMeta[profileName] = { ...DEFAULT_PROFILE_META[profileName] }
    return profileMeta
  }, {})
}

function normalizeKeyFunctions(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      activeProfile: 'Daily',
      profileMeta: createDefaultProfileMeta(),
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
      profileMeta: {
        ...createDefaultProfileMeta(),
        ...(data.profileMeta && typeof data.profileMeta === 'object' && !Array.isArray(data.profileMeta)
          ? data.profileMeta
          : {}),
      },
      profiles: normalizedProfiles,
    }
  }

  return {
    activeProfile: 'Daily',
    profileMeta: createDefaultProfileMeta(),
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
    key,
    popover,
    topNavigation,
    keyboardToolbar,
    keyboardLeftPanel,
    keyboardRightPanel,
  },
  data() {
    return {
      isLightMode: false,
      isProfileEditorOpen: false,
      editingKey: null,
      ...keyboardLayout,
      keyFunctions: {
        activeProfile: 'Daily',
        profileMeta: createDefaultProfileMeta(),
        profiles: createEmptyProfiles(),
      },
      currentModifier: '',
    }
  },
  computed: {
    currentProfile() {
      return this.keyFunctions.activeProfile
    },
    currentProfileMeta() {
      return this.keyFunctions.profileMeta?.[this.currentProfile] || { name: this.currentProfile, icon: '' }
    },
    profileItems() {
      return DEFAULT_PROFILES.map((profileKey) => {
        const meta = this.keyFunctions.profileMeta?.[profileKey] || DEFAULT_PROFILE_META[profileKey]
        return {
          key: profileKey,
          label: meta?.name || profileKey,
          icon: meta?.icon || '/Terraria_icon.jfif',
        }
      })
    },
    currentKeyFunctions() {
      return this.keyFunctions.profiles[this.currentProfile] || {}
    },
  },
  async mounted() {
    this.keyFunctions = normalizeKeyFunctions(await window.electronAPI.loadKeyFunctions())
  },
  methods: {
    selectProfile(profileName) {
      if (this.keyFunctions.profiles[profileName]) {
        this.keyFunctions.activeProfile = profileName
        window.electronAPI.saveKeyFunctions(JSON.parse(JSON.stringify(this.keyFunctions)))
      }
    },
    toggleProfileEditor() {
      this.isProfileEditorOpen = !this.isProfileEditorOpen
    },
    updateCurrentProfileMeta({ name, icon }) {
      if (!this.keyFunctions.profileMeta[this.currentProfile]) {
        this.keyFunctions.profileMeta[this.currentProfile] = { ...DEFAULT_PROFILE_META[this.currentProfile] }
      }

      this.keyFunctions.profileMeta[this.currentProfile] = {
        ...this.keyFunctions.profileMeta[this.currentProfile],
        name,
        icon,
      }

      window.electronAPI.saveKeyFunctions(JSON.parse(JSON.stringify(this.keyFunctions)))
      this.isProfileEditorOpen = false
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
