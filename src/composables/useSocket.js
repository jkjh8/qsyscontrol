import io from 'socket.io-client'
import { ref } from 'vue'

let socket = null
const connected = ref(false)

function connectSocket(addr) {
  socket = io(`http://${addr}`, {
    transports: ['websocket'],
    forceNew: true,
    query: { type: 'device' }
  })
  socket.on('connect', () => {
    console.log('connected', socket.id)
    connected.value = true
  })
  socket.on('reconnect', () => {
    connected.value = true
  })
  socket.on('reconnect_error', () => {
    connected.value = false
  })
  socket.on('reconnect_failed', () => {
    connected.value = false
  })
  socket.on('reconnect_attempt', (attempt) => {
    console.log('reconnect_attempt', attempt)
  })
  socket.on('disconnect', () => {
    connected.value = false
  })
  socket.on('error', (error) => {
    console.log('connect_error', error)
  })
}

export { socket, connected, connectSocket }
