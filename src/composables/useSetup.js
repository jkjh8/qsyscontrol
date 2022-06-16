import { ref } from 'vue'
const settings = ref({})

function updateSettings(args) {
  settings.value = { ...args }
}

export { settings, updateSettings }
