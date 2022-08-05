import { workerData, parentPort } from 'worker_threads'
import cheerio from 'cheerio'
import axios from 'axios'

async function getHtml(ipaddress) {
  const html = await axios.get(`http://${ipaddress}/status`, { timeout: 5000 })
  let status = {}
  const $ = cheerio.load(html.data)
  $('dd').each((i, element) => {
    status[$(element).find('span:nth-of-type(2)').attr('class')] = $(element)
      .find('span:nth-of-type(2)')
      .text()
      .trim()
  })
  parentPort.postMessage(status)
}

if (workerData) {
  getHtml(workerData)
}
