import Qrc from './qrc'
import redis from '../../../db/redis'
import { loggerArr } from '../../../api/logger'

const qsysDevices = {}

function runQsysConnect(ipaddr) {
  try {
    const core = new Qrc(ipaddr)
    qsysDevices[ipaddr] = core
    core.on('error', () => {
      qsysDevices[ipaddr] = null
    })
    core.on('exit', () => {
      qsysDevices[ipaddr] = null
    })
    core.on('message', (args) => {
      console.log(args)
    })
  } catch (err) {
    console.error(err)
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
  qsysDevices[ipaddr].send({
    id: 'GetStatus',
    method: 'StatusGet',
    params: 0
  })
}

export const qsysGetPa = (ipaddr) => {
  chkQsysConnect(ipaddr)
  qsysDevices[ipaddr].send({
    id: 'GetPa',
    method: 'Component.GetControls',
    params: { Name: 'PA' }
  })
}
