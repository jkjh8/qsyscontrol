import net from 'net'
import EventEmitter from 'events'

export default class Qrc extends EventEmitter {
  constructor(ipaddress) {
    super()
    this.client = net.Socket()
    this._ipaddress = ipaddress
    this.connected = false
    this._data = Buffer.alloc(0)
    this._noOpInterval = null
    this._command = []
    this._commandInterval = null

    this.client.on('connect', () => {
      console.log('connected')
      this.connected = true
      this.emit('connect')
      this.noOp()
    })

    this.client.on('close', () => {
      this.connected = false
      this.emit('close')
      clearInterval(this._noOpInterval)
    })

    this.client.on('timeout', () => {
      this.client.end()
      this.emit('error', new Error(`timeout`))
    })

    this.client.on('error', (err) => {
      this.connected = false
      this.emit('error', err)
    })

    this.client.on('data', (data) => {
      if (data.includes(0)) {
        this._data = Buffer.concat([this._data, data.slice(0, data.indexOf(0))])
        this.emit('message', JSON.parse(this._data))
        this._data = Buffer.alloc(0)
      } else {
        this._data = Buffer.concat([this._data, data])
      }
    })
    this.connect()
  }

  connect() {
    try {
      this.client.connect({ port: 1710, host: this._ipaddress })
    } catch (err) {
      this.emit('error', err)
    }
  }

  send(msg) {
    if (this._noOpInterval) {
      clearInterval(this._noOpInterval)
      this._noOpInterval = null
    }
    this._command.push(msg)
    if (!this._commandInterval) {
      this.queueProcess()
      this._commandInterval = setInterval(() => {
        this.queueProcess()
      }, 1000)
    }
  }

  queueProcess() {
    if (this._command.length) {
      if (this.connected) {
        const msg = this._command.shift()
        console.log(msg)
        try {
          this.client.write(JSON.stringify({ jsonrpc: '2.0', ...msg }) + '\0')
        } catch (err) {
          this.emit('error', err)
        }
      }
    } else {
      clearInterval(this._commandInterval)
      this._commandInterval = null
      this.noOp()
    }
  }

  noOp() {
    this._noOpInterval = setInterval(() => {
      console.log('noOp')
      this.client.write(
        JSON.stringify({ jsonrpc: '2.0', method: 'NoOp', params: {} }) + '\0'
      )
    }, 50000)
  }
}
