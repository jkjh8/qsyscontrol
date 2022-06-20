<script setup>
import { onMounted } from 'vue'
import { devices, search, neededControl } from 'src/composables/useDevices'
import PageName from 'components/layouts/pageName.vue'
import IconBtn from 'components/iconBtn'

async function getDevices() {
  devices.value = JSON.parse(await api.send('devices:get'))
}

function fnRefreshDevice(args) {
  api.send('device:getStatus', { ...args })
}

onMounted(() => {
  getDevices()
})
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <page-name
      name="Q-SYS LIST"
      caption="하드웨어 상태 표시"
      icon="svguse:icons.svg#serverColorPlus"
    />

    <div class="row no-wrap items-center q-gutter-x-md">
      <q-input v-model="search" filled dense clearable label="Search">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-separator vertical />
      <IconBtn
        name="refresh"
        color="green-8"
        size="30px"
        msg="새로고침"
        @click="getDevices"
      />
    </div>
  </div>
  <div class="q-mt-md">
    <q-table
      :columns="[
        {
          name: 'index',
          field: 'index',
          label: 'Index',
          sortable: true,
          align: 'center'
        },
        {
          name: 'name',
          field: 'name',
          label: 'Name',
          sortable: true,
          align: 'center'
        },
        {
          name: 'ipaddress',
          field: 'ipaddress',
          label: 'IP address',
          sortable: true,
          align: 'center'
        },
        {
          name: 'deviceType',
          field: 'deviceType',
          label: 'Type',
          sortable: true,
          align: 'center'
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'center'
        }
      ]"
      :rows="neededControl"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              round
              flat
              color="green-8"
              icon="refresh"
              @click="fnRefreshDevice(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
