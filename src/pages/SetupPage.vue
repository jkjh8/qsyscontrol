<script setup>
import { useQuasar } from 'quasar'
import { settings, updateSettings } from 'src/composables/useSetup'
import { required } from 'src/composables/useRules'
import PageName from 'components/layouts/pageName.vue'

const $q = useQuasar()

async function onSubmit() {
  $q.loading.show()
  try {
    const r = await api.send('setSetup', { ...settings.value })
    $q.loading.hide()
    $q.notify({
      message: '설정 변경 완료하였습니다.',
      caption: '변경된 설정 적용을 위해서 프로그램을 다시 시작하세요.',
      position: 'top',
      color: 'primary',
      timeout: 1000,
      icon: 'info'
    })
  } catch (error) {
    $q.loading.hide()
    console.error(error)
  }
}

async function onCancel() {
  updateSettings(await api.send('getSetup'))
}
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <page-name name="SETUP" caption="시스템 기본 설정" icon="settings" />
  </div>

  <div class="q-mt-md row justify-center">
    <q-card flat style="max-width: 600px; min-width: 400px">
      <q-form @submit="onSubmit">
        <q-card-section>
          <q-input
            v-model="settings.serverIp"
            label="Server Address"
            filled
            dense
            :rules="[required]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn class="buttonStyle" flat color="red-10" @click="onCancel"
            >Cancel</q-btn
          >
          <q-btn class="buttonStyle" flat type="submit">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<style scoped>
.buttonStyle {
  width: 6rem;
  border-radius: 1rem;
}
</style>
