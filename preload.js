const fs = require('fs')
const path = require('path')
const { contextBridge } = require('electron')

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
      ...(data.profiles && typeof data.profiles === 'object' && !Array.isArray(data.profiles)
        ? data.profiles
        : {}),
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

contextBridge.exposeInMainWorld('electronAPI', {
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,
  getElectronVersion: () => process.versions.electron,

  loadKeyFunctions: () => {
    const filePath = path.join(process.cwd(), 'public', 'key-functions.json')
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8')
        return normalizeKeyFunctions(JSON.parse(content))
      } else {
        return {
          activeProfile: 'Daily',
          profiles: createEmptyProfiles(),
        }
      }
    } catch (e) {
      console.error('读取 key-functions.json 出错:', e)
      return {
        activeProfile: 'Daily',
        profiles: createEmptyProfiles(),
      }
    }
  },
  saveKeyFunctions: (data) => {
    const filePath = path.join(process.cwd(), 'public', 'key-functions.json')
    try {
      fs.writeFileSync(filePath, JSON.stringify(normalizeKeyFunctions(data), null, 2), 'utf8')
      return true
    } catch (e) {
      console.error('写入 key-functions.json 出错:', e)
      return false
    }
  },
})
