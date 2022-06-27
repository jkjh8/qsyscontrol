import { ref } from 'vue'
const settings = ref({
  address: '',
  path: '',
  connected: false
})

function updateSettings(args) {
  settings.value = args
}

async function getSettings() {
  settings.value = JSON.parse(await api.send('setup:get'))
}

export { settings, updateSettings, getSettings }
