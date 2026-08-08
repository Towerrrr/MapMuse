const { contextBridge, ipcRenderer } = require('electron')

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
      ...(data.profiles && typeof data.profiles === 'object' && !Array.isArray(data.profiles)
        ? data.profiles
        : {}),
    }

    return {
      activeProfile:
        typeof data.activeProfile === 'string' && data.activeProfile in normalizedProfiles
          ? data.activeProfile
          : 'Daily',
      profileMeta: {
        ...createDefaultProfileMeta(),
        ...(data.profileMeta &&
        typeof data.profileMeta === 'object' &&
        !Array.isArray(data.profileMeta)
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

contextBridge.exposeInMainWorld('electronAPI', {
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,
  getElectronVersion: () => process.versions.electron,

  loadKeyFunctions: async () => {
    try {
      const content = await ipcRenderer.invoke('key-functions:load')
      if (!content) {
        return {
          activeProfile: 'Daily',
          profileMeta: createDefaultProfileMeta(),
          profiles: createEmptyProfiles(),
        }
      }

      return normalizeKeyFunctions(JSON.parse(content))
    } catch (e) {
      console.error('读取 key-functions.json 出错:', e)
      return {
        activeProfile: 'Daily',
        profileMeta: createDefaultProfileMeta(),
        profiles: createEmptyProfiles(),
      }
    }
  },
  saveKeyFunctions: async (data) => {
    try {
      await ipcRenderer.invoke(
        'key-functions:save',
        JSON.stringify(normalizeKeyFunctions(data), null, 2),
      )
      return true
    } catch (e) {
      console.error('写入 key-functions.json 出错:', e)
      return false
    }
  },
})
