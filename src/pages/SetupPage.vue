<script setup>
import { settings, updateSettings } from 'src/composables/useSetup'
import { chkIpaddr } from 'src/composables/useRules'
import PageName from 'components/layouts/pageName.vue'

async function onSubmit() {
  await api.send('setSetup', { ...settings.value })
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
            label="Server IP Address"
            filled
            dense
            :rules="[chkIpaddr]"
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
