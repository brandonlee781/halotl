<script setup lang="ts">
interface Props {
  status?: 'correct' | 'close' | 'win' | 'loss' | null
}
defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'game-table__cell': true,
      '!bg-close': status === 'close',
      '!bg-correct': status === 'correct' || status === 'win',
      '!bg-red-800 text-white': status === 'loss',
    }"
  >
    <slot></slot>
  </div>
</template>

<style></style>
