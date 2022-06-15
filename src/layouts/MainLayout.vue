<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Menu from 'components/layouts/menuComponent.vue'
const router = useRouter()

onMounted(() => {
  api.handle('setup', (e, args) => {
    console.log('setup', args)
  })

  api.send('getSetup').then((r) => {
    console.log(r)
  })
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
        />
        <q-toolbar-title class="title"> Q-SYS CONTROL </q-toolbar-title>
      </q-toolbar>
      <Menu />
    </q-header>

    <q-page-container class="page">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
