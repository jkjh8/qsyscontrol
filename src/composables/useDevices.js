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

export { devices, search, neededControl, updateDevices }
