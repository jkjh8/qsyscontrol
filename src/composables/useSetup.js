import { ref } from 'vue'
const settings = ref({
  serverIp: '',
  path: ''
})

function updateSettings(args) {
  settings.value = { ...args }
}

export { settings, updateSettings }
