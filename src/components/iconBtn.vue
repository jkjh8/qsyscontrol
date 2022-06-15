<script setup>
const props = defineProps({
  name: String,
  size: String,
  color: String,
  msg: String
})
const emit = defineEmits(['click'])
</script>

<template>
  <q-icon
    style="cursor: pointer"
    :name="props.name"
    :size="props.size ?? 'sm'"
    :color="props.color ?? 'primary'"
    @click.prevent.stop="emit('click')"
  >
    <q-tooltip
      v-if="props.msg"
      :msg="props.msg"
      class="tooltip-bg"
      anchor="top middle"
      self="bottom middle"
      :offset="[10, 10]"
    >
      {{ props.msg }}
    </q-tooltip>
  </q-icon>
</template>
