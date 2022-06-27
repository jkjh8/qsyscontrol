<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'components/layouts/menuComponent.vue'
import { settings, updateSettings } from 'src/composables/useSetup'
import { devices, updateDevices } from 'src/composables/useDevices'

const router = useRouter()

onMounted(async () => {
  api.handle('setup:rt', (e, args) => {
    updateSettings(JSON.parse(args))
  })
  api.handle('devices:rt', (e, args) => {
    updateDevices(JSON.parse(args))
  })
  api.handle('status:rt', (e, args) => {
    updateStatus(JSON.parse(args))
  })
  updateSettings(await api.send('setup:get'))
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black q-px-lg row no-wrap">
      <q-toolbar>
        <q-icon
          style="cursor: pointer"
          name="svguse:icons.svg#logo"
          size="md"
          @click="router.push('/')"
        >
        </q-icon>
        <q-toolbar-title class="row no-wrap">
          <div class="title">Q-SYS CONTROL</div>
          <div v-if="!settings.connected" class="title-caption">
            Not Connected
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <Menu />
    </q-header>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.title-caption {
  font-size: 0.5rem;
  color: #ff0000;
}
</style>
