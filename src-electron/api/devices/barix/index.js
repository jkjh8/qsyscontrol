import axios from 'axios'
import cheerio from 'cheerio'
import redis from '../../../db/redis'
import { loggerArr } from '../../logger'

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
    await redis.SET(
      `status:${ipaddress}`,
      JSON.stringify({ deviceType: 'Barix', ...status })
    )
    await redis.HSET('status', ipaddress, 'true')
    console.log(status)
  } catch (err) {
    await redis.DEL(`status:${ipaddress}`)
    await redis.HSET('status', ipaddress, 'false')
    loggerArr(5, 'Device Control', `Barix ${ipaddress} ${err}`)
  }
}
