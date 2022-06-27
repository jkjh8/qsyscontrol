<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar, useDialogPluginComponent } from 'quasar'
import InfoQSysDetail from './infoQSys'
import InfoBarixDetail from './infoBarix'

const props = defineProps({ item: Object })
const emit = defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()

let info = ref(null)

onMounted(async () => {
  info.value = JSON.parse(await api.send('device:info', props.item.ipaddress))
})

function onSubmit() {
  onDialogOK()
}
</script>

<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="border-radius: 8px">
      <q-card-section class="row no-wrap items-center">
        <q-icon
          class="q-mr-md"
          name="svguse:icons.svg#serverColorPlus"
          size="sm"
        />
        <q-item-section>
          <q-item-label class="text-bold" style="font-size: 18px">
            하드웨어 상세정보
          </q-item-label>
        </q-item-section>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <InfoQSysDetail
          v-if="item.deviceType === 'Q-Sys'"
          :item="item"
          :status="info"
        />
        <InfoBarixDetail
          v-else-if="item.deviceType === 'Barix'"
          :item="item"
          :status="info"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          style="width: 80px"
          label="확인"
          class="text-primary"
          flat
          rounded
          @click="onDialogCancel"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
