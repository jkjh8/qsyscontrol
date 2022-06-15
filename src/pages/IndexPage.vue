<script setup>
import PageName from 'components/layouts/pageName.vue'
import IconBtn from 'components/iconBtn'
</script>

<template>
  <div class="row justify-between items-center">
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
  <q-table></q-table>
</template>

<style scoped></style>
