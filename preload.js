const fs = require('fs')
const path = require('path')
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,
  getElectronVersion: () => process.versions.electron,

  loadKeyFunctions: () => {
    const filePath = path.join(process.cwd(), 'public', 'key-functions.json')
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(content)
      } else {
        // 文件不存在，返回空对象
        return {}
      }
    } catch (e) {
      console.error('读取 key-functions.json 出错:', e)
      return {}
    }
  },
})
