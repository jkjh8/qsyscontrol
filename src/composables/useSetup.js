import { ref } from 'vue'
const settings = ref({
  serverIp: '',
  serverPort: 3000
})

function updateSettings(args) {
  settings.value = { ...args }
}

export { settings, updateSettings }
