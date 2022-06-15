<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black q-px-lg">
      <q-toolbar>
        <div class="row no-wrap items-center">
          <q-icon
            style="cursor: pointer"
            name="svguse:icons.svg#logo"
            size="md"
            @click="router.push('/')"
          />
          <q-toolbar-title class="title"> Q-SYS CONTROL </q-toolbar-title>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
