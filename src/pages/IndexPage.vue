<script setup>
import { devices, search } from 'src/composables/useDevices'
import PageName from 'components/layouts/pageName.vue'
import IconBtn from 'components/iconBtn'
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <page-name
      name="Q-SYS LIST"
      caption="하드웨어 등록 삭제 및 관리"
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
        name="add_circle"
        color="green-10"
        size="30px"
        msg="하드웨어추가"
        @click="fnAdd()"
      />
      <IconBtn
        name="refresh"
        color="green-10"
        size="30px"
        msg="새로고침"
        @click="fnRefreshAll()"
      />
    </div>
  </div>
  <div class="q-mt-md">
    <q-table
      :columns="[
        {
          name: 'index',
          field: 'index',
          label: 'INDEX',
          sortable: true,
          align: 'center'
        },
        {
          name: 'name',
          field: 'name',
          label: 'NAME',
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
          name: 'actions',
          label: 'Actions',
          align: 'center'
        }
      ]"
    ></q-table>
  </div>
</template>

<style scoped></style>
