import Devices from '../../db/models/devices'
import { qsysGetStatus, qsysGetPa } from './qsys'
import barixGetStatus from './barix'

export default async function () {
  const devices = await Devices.find({ mode: { $ne: 'Local' } })

  devices.forEach((device) => {
    const { deviceType, ipaddress } = device
    switch (deviceType) {
      case 'Q-Sys':
        qsysGetPa(ipaddress)
        break
      case 'Barix':
        barixGetStatus(ipaddress)
        break
    }
  })
}
