import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'

const socket = io('http://localhost:3000', {
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  autoConnect: true,
  withCredentials: true,
  query: { type: 'device' }
})

export default boot(({ app }) => {
  app.config.globalProperties.$socketio = socket
})

export { socket }
