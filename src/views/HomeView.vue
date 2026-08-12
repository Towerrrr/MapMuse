<template>
  <div class="home-view" :class="{ 'light-mode': isLightMode }">
    <top-navigation
      :activeKey="currentProfile"
      :items="profileItems"
      @select="selectProfile"
      @create="openCreateProfileDialog"
    />

    <profile-create-dialog
      v-if="isCreateProfileDialogOpen"
      :existingKeys="profileKeys"
      @close="closeCreateProfileDialog"
      @create="createProfile"
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
import profileCreateDialog from '@/components/profile-create-dialog.vue'
import keyboardToolbar from '@/components/keyboard-toolbar.vue'
import keyboardLeftPanel from '@/components/keyboard-left-panel.vue'
import keyboardRightPanel from '@/components/keyboard-right-panel.vue'

const DEFAULT_PROFILE_ORDER = ['Daily', 'CS', 'Terraria', 'ARK']
const DEFAULT_PROFILE_ICON = '/Terraria_icon.jfif'

const DEFAULT_PROFILE_META = {
  Daily: {
    name: '日常',
    icon: DEFAULT_PROFILE_ICON,
  },
  CS: {
    name: 'CS',
    icon: DEFAULT_PROFILE_ICON,
  },
  Terraria: {
    name: '泰拉',
    icon: DEFAULT_PROFILE_ICON,
  },
  ARK: {
    name: 'ARK',
    icon: DEFAULT_PROFILE_ICON,
  },
}

function createDefaultProfiles() {
  return DEFAULT_PROFILE_ORDER.reduce((profiles, profileName) => {
    profiles[profileName] = {}
    return profiles
  }, {})
}

function createDefaultProfileMeta() {
  return DEFAULT_PROFILE_ORDER.reduce((profileMeta, profileName) => {
    profileMeta[profileName] = { ...DEFAULT_PROFILE_META[profileName] }
    return profileMeta
  }, {})
}

function createDefaultProfileEntry(profileKey) {
  return {
    name: profileKey,
    icon: DEFAULT_PROFILE_ICON,
  }
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
}

function normalizeProfileOrder(profiles = {}, profileMeta = {}) {
  const orderedKeys = [...DEFAULT_PROFILE_ORDER]
  const knownKeys = new Set(orderedKeys)

  for (const profileKey of Object.keys(profiles)) {
    if (!knownKeys.has(profileKey)) {
      knownKeys.add(profileKey)
      orderedKeys.push(profileKey)
    }
  }

  for (const profileKey of Object.keys(profileMeta)) {
    if (!knownKeys.has(profileKey)) {
      knownKeys.add(profileKey)
      orderedKeys.push(profileKey)
    }
  }

  return orderedKeys
}

function normalizeKeyFunctions(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      activeProfile: DEFAULT_PROFILE_ORDER[0],
      profileMeta: createDefaultProfileMeta(),
      profiles: createDefaultProfiles(),
    }
  }

  if ('profiles' in data) {
    const incomingProfiles = isPlainObject(data.profiles) ? data.profiles : {}
    const incomingProfileMeta = isPlainObject(data.profileMeta) ? data.profileMeta : {}
    const normalizedProfiles = {}
    const normalizedProfileMeta = {}

    for (const profileKey of normalizeProfileOrder(incomingProfiles, incomingProfileMeta)) {
      normalizedProfiles[profileKey] = isPlainObject(incomingProfiles[profileKey]) ? { ...incomingProfiles[profileKey] } : {}

      const baseMeta = DEFAULT_PROFILE_META[profileKey] || createDefaultProfileEntry(profileKey)
      const profileMeta = isPlainObject(incomingProfileMeta[profileKey]) ? incomingProfileMeta[profileKey] : {}

      normalizedProfileMeta[profileKey] = {
        ...baseMeta,
        ...profileMeta,
        name: typeof profileMeta.name === 'string' && profileMeta.name.trim() ? profileMeta.name.trim() : baseMeta.name,
        icon:
          typeof profileMeta.icon === 'string' && profileMeta.icon.trim() ? profileMeta.icon.trim() : baseMeta.icon,
      }
    }

    const activeProfile =
      typeof data.activeProfile === 'string' && data.activeProfile in normalizedProfiles
        ? data.activeProfile
        : normalizeProfileOrder(incomingProfiles, incomingProfileMeta)[0] || DEFAULT_PROFILE_ORDER[0]

    return {
      activeProfile,
      profileMeta: normalizedProfileMeta,
      profiles: normalizedProfiles,
    }
  }

  const legacyProfiles = isPlainObject(data) ? data : {}

  return {
    activeProfile: DEFAULT_PROFILE_ORDER[0],
    profileMeta: createDefaultProfileMeta(),
    profiles: {
      Daily: legacyProfiles,
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
    profileCreateDialog,
    keyboardToolbar,
    keyboardLeftPanel,
    keyboardRightPanel,
  },
  data() {
    return {
      isLightMode: false,
      isProfileEditorOpen: false,
      isCreateProfileDialogOpen: false,
      editingKey: null,
      ...keyboardLayout,
      keyFunctions: {
        activeProfile: DEFAULT_PROFILE_ORDER[0],
        profileMeta: createDefaultProfileMeta(),
        profiles: createDefaultProfiles(),
      },
      currentModifier: '',
    }
  },
  computed: {
    currentProfile() {
      return this.keyFunctions.activeProfile
    },
    currentProfileMeta() {
      return this.keyFunctions.profileMeta?.[this.currentProfile] || createDefaultProfileEntry(this.currentProfile)
    },
    profileKeys() {
      return Object.keys(this.keyFunctions.profiles || {})
    },
    profileItems() {
      return this.profileKeys.map((profileKey) => {
        const meta = this.keyFunctions.profileMeta?.[profileKey] || createDefaultProfileEntry(profileKey)
        return {
          key: profileKey,
          label: meta?.name || profileKey,
          icon: meta?.icon || DEFAULT_PROFILE_ICON,
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
    openCreateProfileDialog() {
      this.isCreateProfileDialogOpen = true
    },
    closeCreateProfileDialog() {
      this.isCreateProfileDialogOpen = false
    },
    createProfile({ key, name, icon }) {
      const profileKey = typeof key === 'string' ? key.trim() : ''

      if (!profileKey || this.keyFunctions.profiles[profileKey]) {
        return
      }

      const profileName = typeof name === 'string' && name.trim() ? name.trim() : profileKey
      const profileIcon = typeof icon === 'string' && icon.trim() ? icon.trim() : DEFAULT_PROFILE_ICON

      this.keyFunctions.profiles[profileKey] = {}
      this.keyFunctions.profileMeta[profileKey] = {
        name: profileName,
        icon: profileIcon,
      }
      this.keyFunctions.activeProfile = profileKey

      window.electronAPI.saveKeyFunctions(JSON.parse(JSON.stringify(this.keyFunctions)))
      this.isCreateProfileDialogOpen = false
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
