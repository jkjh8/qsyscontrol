import { ipcMain, BrowserWindow, dialog } from 'electron'
import path from 'node:path'
import Devices from '../db/models/devices'
import { getSetup, setSetup } from '../setupFiles'
import { qsysGetStatus, qsysGetPaStatic } from '../api/devices/qsys'
import barixGetStatus from '../api/devices/barix'
import redis from '../db/redis'

import { getDevices } from '../api/devices'

ipcMain.handle('status:get', async () => {
  return JSON.stringify(await redis.HGETALL('status'))
})

ipcMain.handle('setup:get', async (e) => {
  return JSON.stringify(setupVal)
})

ipcMain.handle('setup:set', async (e, args) => {
  return setSetup(JSON.parse(args))
})

ipcMain.handle('setup:getDirectory', async (e) => {
  const { filePaths } = await dialog.showOpenDialog(BrowserWindow.fromId(1), {
    properties: ['openDirectory']
  })
  return path.normalize(filePaths[0])
})

ipcMain.handle('devices:get', async () => {
  return JSON.stringify(await getDevices())
})

ipcMain.handle('device:info', async (e, ipaddr) => {
  return await redis.get(`status:${ipaddr}`)
})

ipcMain.handle('device:getStatus', async (e, args) => {
  const { deviceType, ipaddress } = JSON.parse(args)
  switch (deviceType) {
    case 'Q-Sys':
      // qsysGetStatus(ipaddress)
      qsysGetPaStatic(ipaddress)
      break
    case 'Barix':
      barixGetStatus(ipaddress)
      break
  }
})
