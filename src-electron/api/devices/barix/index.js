import { api } from '../../useAxios'

export function fromBarix(workerData) {
  const worker = new Worker('./worker.js', { workerData })
  worker.on('message', async (msg) => {
    const r = await api.post('/device/barix/update')
    console.log(r)
    worker.terminate()
  })

  worker.on('error', async (err) => {
    const r = await api.get('/device/barix/status:')
    console.error(err)
    worker.terminate()
  })

  worker.on('exit', (code) => {
    if (!code === 1) {
      console.error('exit, ' + code)
    }
  })
}
