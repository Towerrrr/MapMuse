import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const seedFilePath = path.join(__dirname, 'public', 'key-functions.json')

function readKeyFunctionsFile() {
  const userDataDir = app.getPath('userData')
  const keyFunctionsFilePath = path.join(userDataDir, 'key-functions.json')
  const sourcePath = fs.existsSync(keyFunctionsFilePath) ? keyFunctionsFilePath : seedFilePath
  if (!fs.existsSync(sourcePath)) {
    return null
  }

  return fs.readFileSync(sourcePath, 'utf8')
}

function writeKeyFunctionsFile(content) {
  const userDataDir = app.getPath('userData')
  const keyFunctionsFilePath = path.join(userDataDir, 'key-functions.json')
  fs.mkdirSync(userDataDir, { recursive: true })
  fs.writeFileSync(keyFunctionsFilePath, content, 'utf8')
}

ipcMain.handle('key-functions:load', () => {
  const content = readKeyFunctionsFile()
  return content || ''
})

ipcMain.handle('key-functions:save', (_event, content) => {
  writeKeyFunctionsFile(content)
  return true
})

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  })

  win.maximize()

  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
