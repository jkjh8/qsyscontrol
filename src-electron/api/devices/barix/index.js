import { Worker } from 'worker_threads'
import redis from '../../../db/redis'
import { loggerArr } from '../../logger'

module.exports = (workerData) => {
  const worker = new Worker('./src-electron/api/devices/barix/barixWorker.js', {workerData})

  worker.on('message', (args) => {
    if (args.command === 'comm') {
      await redis.SET(
        `status:${workerData}`, JSON.stringify({ deviceType: 'Barix', ...args.data }), { EX: 600 }
      )
      await redis.HSET('status', workerData, true)
    } else {
      await redis.DEL(`status:${workerData}`)
      await redis.HSET('status', workerData, false)
      loggerArr(5, 'Device Control', args.data)
    }
    worker.terminate()
  })

  worker.on('error', async (err) => {
    await redis.DEL(`status:${workerData}`)
    await redis.HSET('status', workerData, false)
    loggerArr(5, 'Device Control', `Barix ${workerData} Error ${err}`)
    worker.terminate()
  })

  worker.on('exit', (code) => {
    if (!code === 1) {
      loggerArr(4, 'Device Control', `Barix ${workerData} Exit ${code}`)
    }
  })
}
