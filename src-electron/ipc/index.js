import { ipcMain, BrowserWindow, dialog } from 'electron'
import path from 'node:path'
import { getSetup, setSetup } from '../setupFiles'

ipcMain.handle('setup:get', async (e) => {
  return setupVal
})

ipcMain.handle('setup:set', async (e, args) => {
  return setSetup(args)
})

ipcMain.handle('setup:getDirectory', async (e) => {
  const { filePaths } = await dialog.showOpenDialog(BrowserWindow.fromId(1), {
    properties: ['openDirectory']
  })
  return path.normalize(filePaths[0])
})
