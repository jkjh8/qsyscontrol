import { ref, computed } from 'vue'
const devices = ref([])

const neededControl = computed(() => {
  const rt = []
  devices.value.forEach((dev) => {
    if (dev.mode !== 'Local') {
      rt.push(dev)
    }
  })
  return rt
})
const search = ref('')

export { devices, search, neededControl }
