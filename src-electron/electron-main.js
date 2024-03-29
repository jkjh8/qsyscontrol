import { app, BrowserWindow, nativeTheme, protocol, session } from 'electron'
import path from 'path'
import os from 'os'
// import refreshDevices from './api/devices'
// import { getSetup } from './setupFiles'
// import { connectSocket } from './io'

// global.deviceStatus = {}

app.requestSingleInstanceLock({ key: 'qsyscontrolforbs' })
app.on('second-instance', (e, argv, cwd) => {
  console.log(e, argv, cwd)
  app.exit(0)
})

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

// import './ipc'

let mainWindow
let refreshInterval

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  }
  // } else {
  //   // we're on production; no access to devtools pls
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools()
  //   })
  // }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// app.whenReady().then(createWindow)
app.on('ready', async () => {
  protocol.registerFileProtocol('local', (request, callback) => {
    const pathname = decodeURIComponent(request.url.replace('local://', ''))
    try {
      callback(pathname)
    } catch (error) {
      console.log(error)
    }
  })

  const filter = {
    urls: ['*://*.example.com/*']
  }

  session.defaultSession.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      details.responseHeaders['Access-Control-Allow-Origin'] = [
        'http://localhost:3000'
      ]
      callback({ responseHeaders: details.responseHeaders })
    }
  )
  // import('./db/mongodb')
  // getSetup()
  createWindow()
  // connectSocket(setupVal.address)
  // refreshInterval = setInterval(() => {
  //   refreshDevices()
  // }, 55000)
})
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
