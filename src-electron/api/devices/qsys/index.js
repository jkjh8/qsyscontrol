import Qrc from './qrc'
import redis from '../../../db/redis'
import { loggerArr } from '../../../api/logger'
import Devices from '../../../db/models/devices'
import { socketSend } from '../../../io'

const qsysDevices = {}

async function runQsysConnect(ipaddr) {
  try {
    const core = new Qrc(ipaddr)
    qsysDevices[ipaddr] = core
    core.on('connect', async () => {
      await redis.HSET('status', ipaddr, 'true')
      loggerArr(3, 'Device Control', `Q-Sys Connected ${ipaddr}`)
    })
    core.on('error', async (err) => {
      qsysDevices[ipaddr] = null
      await redis.HSET('status', ipaddr, 'false')
      loggerArr(5, 'Device Control', `Q-Sys ${ipaddr} ${err}`)
    })
    core.on('exit', async () => {
      qsysDevices[ipaddr] = null
      await redis.HSET('status', ipaddr, 'false')
      loggerArr(5, 'Device Control', `Q-Sys Exit ${ipaddr}`)
    })
    core.on('message', (args) => {
      qsysCommands(ipaddr, args)
    })
  } catch (err) {
    await redis.HSET('status', ipaddr, 'false')
    loggerArr(5, 'Device Control', `Q-Sys ${ipaddr} ${err}`)
  }
}

function chkQsysConnect(ipaddr) {
  if (!qsysDevices[ipaddr]) {
    runQsysConnect(ipaddr)
  }
}

export const qsysSendMsg = (ipaddr, args) => {
  chkQsysConnect(ipaddr)
  qsysDevices[ipaddr].send(args)
}

export const qsysGetStatus = (ipaddr) => {
  chkQsysConnect(ipaddr)
  qsysDevices[ipaddr].getStatus()
}

export const qsysGetPa = (ipaddr) => {
  chkQsysConnect(ipaddr)
  qsysDevices[ipaddr].getPa()
}

export const qsysGetPaStatic = (ipaddr) => {
  chkQsysConnect(ipaddr)
  qsysDevices[ipaddr].getPaStatic()
}
export const qsysSetTx = async (device) => {
  try {
    const { core, channels, children } = device

    chkQsysConnect(core.ipaddress)

    const channel = 32
    if (core.model === '110f') {
      channels = 4
    }

    if (channel > channels) {
      channel = channels
    }

    for (let i = 0; i < channel; i++) {
      if (children[i]) {
        let child
        if (typeof children[i] === 'string') {
          child = await Devices.findOne({ _id: children[i] })
        } else {
          child = children[i]
        }

        if (child.mode === 'Local') {
          qsysDevices[core.ipaddress].send({
            id: 'SetTX',
            method: 'Component.Set',
            params: {
              Name: `MS-TX-${i + 1}`,
              Controls: [{ Name: 'enable', Value: false }]
            }
          })
        } else {
          qsysDevices[core.ipaddress].send({
            id: 'SetTX',
            method: 'Component.Set',
            params: {
              Name: `MS-TX-${i + 1}`,
              Controls: [
                { Name: 'host', Value: child.ipaddress },
                { Name: 'port', Value: child.port },
                { Name: 'enable', Value: true }
              ]
            }
          })
        }
      } else {
        qsysDevices[core.ipaddress].send({
          id: 'SetTX',
          method: 'Component.Set',
          params: {
            Name: `MS-TX-${i + 1}`,
            Controls: [{ Name: 'enable', Value: false }]
          }
        })
      }
    }
  } catch (err) {
    loggerArr(5, 'Device Control', `Q-Sys ${err}`)
  }
}

async function qsysCommands(ipaddr, args) {
  try {
    const { id } = args
    switch (id) {
      case 'GetStatus':
        await redis.set(
          `status:${ipaddr}`,
          JSON.stringify({ deviceType: 'Q-Sys', ...args.result }),
          { EX: 600 }
        )
        break
      case 'GetPa':
        await redis.set(
          `pa:${ipaddr}`,
          JSON.stringify({ deviceType: 'Q-Sys', ...args.result.Controls }),
          { EX: 600 }
        )
        break
      case 'GetPaStatic':
        await redis.set(
          `pa:${ipaddr}`,
          JSON.stringify({ deviceType: 'Q-Sys', ...args.result.Controls }),
          { EX: 600 }
        )
        // send data throw socketio
        socketSend('PA', args.result.Controls)
        break
      default:
        console.log('not match id', args)
    }
    await redis.HSET('status', ipaddr, 'true')
  } catch (err) {
    await redis.HSET('status', ipaddr, 'false')
    loggerArr(5, 'Device Control', `Q-Sys ${ipaddr} ${err}`)
  }
}
