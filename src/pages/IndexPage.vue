<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { devices, search, neededControl } from 'src/composables/useDevices'
import { status, getStatus, getColorStatus } from 'src/composables/useStatus'
import { getSettings } from 'src/composables/useSetup'

import InfoDialog from 'components/dialogs/info/infoDialog.vue'
import PageName from 'components/layouts/pageName.vue'
import IconBtn from 'components/iconBtn'

const $q = useQuasar()

async function getDevices() {
  console.log('getdevice')
  devices.value = JSON.parse(await api.send('devices:get'))
}

function fnRefreshDevice(args) {
  api.send('device:getStatus', JSON.stringify(args))
}

function getInfo(args) {
  $q.dialog({
    component: InfoDialog,
    componentProps: { item: args }
  })
}

onMounted(async () => {
  await getDevices()
  await getStatus()
  await getSettings()
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
      <template #body-cell-index="props">
        <q-td :props="props">
          <q-avatar round size="sm">
            {{ props.row.index }}
            <q-badge
              rounded
              floating
              :color="getColorStatus(props.row.ipaddress)"
            ></q-badge>
          </q-avatar>
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              round
              flat
              icon="info"
              color="yellow-8"
              @click="getInfo(props.row)"
            >
              <q-tooltip>Infomation</q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              color="green-8"
              icon="refresh"
              @click="fnRefreshDevice(props.row)"
            >
              <q-tooltip>Refresh</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
