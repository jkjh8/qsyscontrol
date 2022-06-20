import { json } from 'body-parser'
import { ipcMain, BrowserWindow, dialog } from 'electron'
import path from 'node:path'
import Devices from '../db/models/devices'
import { getSetup, setSetup } from '../setupFiles'
import { qsysGetPa } from '../api/devices/qsys'

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

ipcMain.handle('devices:get', async () => {
  return JSON.stringify(await Devices.find({}).sort({ index: 1 }))
})

ipcMain.handle('device:getStatus', async (e, device) => {
  if (device.deviceType === 'Q-Sys') {
    qsysGetPa(device.ipaddress)
  }
})
