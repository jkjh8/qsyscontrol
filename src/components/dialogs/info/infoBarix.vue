<script setup>
const props = defineProps({ item: Object, status: Object })
</script>

<template>
  <div v-if="status">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Status</q-item-label>
          <q-item-label caption>{{ status.status }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Hardware Type</q-item-label>
          <q-item-label caption>{{ status.hwtype }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>MAC Address</q-item-label>
          <q-item-label caption>{{ status.mac }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>IP Address</q-item-label>
          <q-item-label caption>{{ status.ip }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Net Mask</q-item-label>
          <q-item-label caption>{{ status.netmask }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Gateway</q-item-label>
          <q-item-label caption>{{ status.gateway }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Up Time</q-item-label>
          <q-item-label caption>{{ status.uptime }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Reconnect</q-item-label>
          <q-item-label caption>{{ status.reconnects }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-item-label>Current URL</q-item-label>
          <q-item-label caption>{{ status.url }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>URL 1</q-item-label>
          <q-item-label caption>{{ status.url1 }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>URL 2</q-item-label>
          <q-item-label caption>{{ status.url2 }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>URL 3</q-item-label>
          <q-item-label caption>{{ status.url3 }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Relay</q-item-label>
          <q-item-label caption>{{ status.relay1 }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else>No Device Infomation</div>
</template>
