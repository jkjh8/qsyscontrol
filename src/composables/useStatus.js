import { ref } from 'vue'

const status = ref(null)

async function updateStatus(args) {
  status.value = args
}

async function getStatus(args) {
  status.value = JSON.parse(await api.send('status:get'))
}

function getColorStatus(ipaddr) {
  if (status.value && status.value[ipaddr] === 'true') {
    return 'green'
  }
  return 'red'
}

export { status, updateStatus, getStatus, getColorStatus }
