<script setup>
const props = defineProps({ item: Object, status: Object })
</script>

<template>
  <div v-if="status">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Design Code</q-item-label>
          <q-item-label caption>{{ status.DesignCode }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Design Name</q-item-label>
          <q-item-label caption>{{ status.DesignName }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Is Emulator</q-item-label>
          <q-item-label caption>{{ status.IsEmulator }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Is Redundant</q-item-label>
          <q-item-label caption>{{ status.IsRedundant }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Platform</q-item-label>
          <q-item-label caption>{{ status.Platform }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>State</q-item-label>
          <q-item-label caption>{{ status.State }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Status</q-item-label>
          <q-item-label caption>{{ status.Status.String }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else>No Device Infomation</div>
</template>
