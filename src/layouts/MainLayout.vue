<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'components/layouts/menuComponent.vue'
import { settings, updateSettings } from 'src/composables/useSetup'
import { connected, connectSocket } from 'src/composables/useSocket'
const router = useRouter()

onMounted(async () => {
  // api.handle('setup', (e, args) => {
  //   console.log('setup', args)
  // })

  updateSettings(await api.send('setup:get'))
  if (settings.value.serverIp) {
    connectSocket(settings.value.serverIp)
  }
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
          <div v-if="!connected" class="title-caption">Not Connected</div>
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
