<script setup lang="ts">
interface Props {
  status?: 'correct' | 'close' | 'win' | 'lose'
}
defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'game-table__cell': true,
      '!bg-close': status === 'close',
      '!bg-correct': status === 'correct' || status === 'win',
      '!bg-red-800 text-white': status === 'lose',
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
/* .game-table-cell:first-child {
  border-right: 1px solid #f5f2ec;
  padding-left: 10px;
  padding-right: 10px;

  background: 0 0;
  grid-area: name;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 700;
  border: none;
} */

.game-table-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
}
</style>
