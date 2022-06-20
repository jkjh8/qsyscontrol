import { BrowserWindow } from 'electron'
import io from 'socket.io-client'

global.socket = null

function connectSocket(addr) {
  const mainWindow = BrowserWindow.fromId(1)

  socket = io(`http://${addr}`, {
    transports: ['websocket'],
    forceNew: true,
    query: { type: 'device' }
  })

  socket.on('connect', () => {
    console.log('connected', socket.id)
    setupVal.connected = true
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('reconnect', () => {
    setupVal.connected = true
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('reconnect_error', () => {
    setupVal.connected = false
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('reconnect_failed', () => {
    setupVal.connected = false
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('reconnect_attempt', (attempt) => {
    console.log('reconnect_attempt', attempt)
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('disconnect', () => {
    setupVal.connected = false
    mainWindow.webContents.send('setup:rt', setupVal)
  })
  socket.on('error', (error) => {
    console.log('connect_error', error)
    mainWindow.webContents.send('setup:rt', setupVal)
  })

  socket.on('devices', (args) => {
    mainWindow.webContents.send('devices:rt', args)
  })
}

export { connectSocket }
