import { ipcMain, BrowserWindow } from 'electron'

import { getSetup, setSetup } from '../setupFiles'

getSetup()
ipcMain.handle('getSetup', async (e) => {
  return setupVal
})

ipcMain.handle('setSetup', async (e, args) => {
  return setSetup(args)
})
