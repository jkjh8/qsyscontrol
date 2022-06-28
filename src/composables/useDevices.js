import { ref, computed } from 'vue'
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
  devices.value = JSON.parse(await api.send('devices:get'))
}

export { devices, search, neededControl, updateDevices, getDevices }
