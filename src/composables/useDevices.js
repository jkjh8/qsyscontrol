import { ref, computed } from 'vue'
import { api } from './useAxios'

const devices = ref([])
const search = ref('')

const neededControl = computed(() => {
  const rt = []
  devices.value.forEach((dev) => {
    if (dev.mode !== 'Local') {
      rt.push(dev)
    }
  })
  return rt
})

function updateDevices(args) {
  devices.value = args
}

async function getDevices() {
  const r = await api.get('/device/qcontrol')
  console.log(r)
  devices.value = r.data
}

export { devices, search, neededControl, updateDevices, getDevices }
