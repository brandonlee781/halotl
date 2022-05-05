<script setup lang="ts">
import { watch, nextTick } from 'vue'
import useGuess from '@/composables/useGuess'
const { guesses } = useGuess()
const tableBody = ref<HTMLDivElement>()

watch(
  () => guesses.value,
  nextVal => {
    if (tableBody.value) {
      nextTick(() => {
        const height = tableBody.value?.scrollHeight || 0
        tableBody.value!.scrollTop = height
      })
    }
  }
)
</script>

<template>
  <div
    ref="tableBody"
    :class="{ 'game-table__body': true, scrolled: guesses.length >= 4 }"
  >
    <GameTableBodyRow
      v-for="(guess, index) in guesses"
      :key="guess.playerID"
      :name="guess.name"
      :team="guess.teamName"
      :team-image="guess.teamImage"
      :kills="guess.kills"
      :assists="guess.assists"
      :damage="guess.damageDealt"
      :kills-power-weapons="guess.killsPowerWeapons"
      :flag-captures="guess.flagCaptures"
      :oddball-total-time="guess.oddballTotalTime!"
      :last-row="index === guesses.length - 1"
    />
  </div>
</template>

<style>
.game-table__body {
  max-height: calc(100vh - 450px);
  min-height: 140px;
  overflow-x: visible;
  overflow-y: scroll;
  margin: 0 -20px;
  scrollbar-width: none;
}
.game-table__body::-webkit-scrollbar {
  background: transparent;
  width: 0;
}

.game-table__body .game-table__row .game-table__cell > div {
  position: relative;
  padding: 14px 8px;
}

@media (min-width: 768px) {
  .game-table__body {
    margin: initial;
    max-height: calc(100vh - 620px);
    overflow-y: auto;
  }

  .game-table__body .game-table__row {
    background: 0 0;
    padding: initial;
    grid-template-columns: 250px 100px 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'name team kills assist dam power caps ball';
  }

  .game-table__body .game-table__row .game-table__cell {
    border-top: none;
    font-size: 16px;
  }

  .game-table__body .game-table__row .game-table__cell:first-child {
    border-right: 1px solid #f5f2ec;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
