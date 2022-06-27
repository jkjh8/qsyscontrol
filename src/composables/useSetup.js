import { ref } from 'vue'
const settings = ref({
  address: '',
  path: '',
  connected: false
})

function updateSettings(args) {
  settings.value = args
}

export { settings, updateSettings }
