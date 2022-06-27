import { BrowserWindow } from 'electron'
import io from 'socket.io-client'

global.socket = null
function rtSetup() {
  BrowserWindow.fromId(1).webContents.send('setup:rt', JSON.stringify(setupVal))
}
function connectSocket(addr) {
  console.log('start socketio')
  const mainWindow = BrowserWindow.fromId(1)

  socket = io(`http://${addr}`, {
    transports: ['websocket'],
    forceNew: true,
    query: { type: 'device' }
  })

  socket.on('connect', () => {
    console.log('connected', socket.id)
    setupVal.connected = true
    rtSetup()
  })
  socket.on('reconnect', () => {
    setupVal.connected = true
    rtSetup()
  })
  socket.on('reconnect_error', () => {
    setupVal.connected = false
    rtSetup()
  })
  socket.on('reconnect_failed', () => {
    setupVal.connected = false
    rtSetup()
  })
  socket.on('reconnect_attempt', (attempt) => {
    console.log('reconnect_attempt', attempt)
    rtSetup()
  })
  socket.on('disconnect', () => {
    setupVal.connected = false
    rtSetup()
  })
  socket.on('error', (error) => {
    console.log('connect_error', error)
    rtSetup()
  })

  socket.on('devices', (args) => {
    mainWindow.webContents.send('devices:rt', JSON.stringify(args))
  })
}

export { connectSocket }
