<script setup>
const props = defineProps({
  name: String,
  caption: String,
  icon: String,
  color: String
})
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <q-icon :name="icon" size="md" :color="color ?? 'primary'" />
    </q-item-section>
    <q-item-section>
      <q-item-label> {{ name }} </q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
