import { loggerArr } from '../../api/logger'
import { createClient } from 'redis'

const client = createClient({
  url: 'redis://localhost:6379',
  password: process.env.DB_PASS
})

async function connectRedis() {
  client.on('error', (err) =>
    loggerArr(5, 'Device Control', `Redis Client Error, ${JSON.stringify(err)}`)
  )
  await client.connect()
  loggerArr(3, 'Device Control', 'Redis Clients Connected')
}

connectRedis()

export default client
