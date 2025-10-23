const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getNodeVersion: () => process.versions.node,
  getChromeVersion: () => process.versions.chrome,
  getElectronVersion: () => process.versions.electron,
})
