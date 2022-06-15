import { ipcMain, BrowserWindow } from 'electron'

import { getSetup, setSetup } from '../setupFiles'

getSetup()
ipcMain.handle('getSetup', async (e) => {
  // BrowserWindow.fromId(1).webContents.send('setup', setupVal)
  console.log(setupVal)
  return setupVal
})
