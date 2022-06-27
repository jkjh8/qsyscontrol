import axios from 'axios'
import cheerio from 'cheerio'
import redis from '../../../db/redis'
import { loggerArr } from '../../logger'

// module.exports = (workerData) => {
//   const worker = new Worker('./barix.js', {workerData})

//   worker.on('message', (args) => {
//     if (args.command === 'comm') {
//       await redis.SET(
//         `status:${workerData}`, JSON.stringify({ deviceType: 'Barix', ...args.data }), { EX: 600 }
//       )
//       await redis.HSET('status', workerData, true)
//     } else {
//       await redis.DEL(`status:${workerData}`)
//       await redis.HSET('status', workerData, false)
//       loggerArr(5, 'Device Control', args.data)
//     }
//     worker.terminate()
//   })

//   worker.on('error', async (err) => {
//     await redis.DEL(`status:${workerData}`)
//     await redis.HSET('status', workerData, false)
//     loggerArr(5, 'Device Control', `Barix ${workerData} Error ${err}`)
//     worker.terminate()
//   })

//   worker.on('exit', (code) => {
//     if (!code === 1) {
//       loggerArr(4, 'Device Control', `Barix ${workerData} Exit ${code}`)
//     }
//   })
// }

export default async function (ipaddress) {
  try {
    const html = await axios.get(`http://${ipaddress}/status`, {
      timeout: 5000
    })
    let status = []
    const $ = cheerio.load(html.data)
    $('dd').each((i, item) => {
      status[$(item).find('span:nth-of-type(2)').attr('class')] = $(item)
        .find('span:nth-of-type(2)')
        .text()
        .trim()
    })
    await redis.SET(`status:${ipaddress}`, JSON.stringify(status))
    await redis.HSET('status', ipaddress, 'true')
    console.log(status)
  } catch (err) {
    await redis.DEL(`status:${ipaddress}`)
    await redis.HSET('status', ipaddress, 'false')
    loggerArr(5, 'Device Control', `Barix ${ipaddress} ${err}`)
  }
}
