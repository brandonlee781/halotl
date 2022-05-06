<script setup lang="ts">
import useGuess from '@/composables/useGuess'

let showStats = $ref(false)
let showHowTo = $ref(false)
let showGameOver = $ref(false)

const { stats, gameOver } = useGuess()

watch(gameOver, newVal => {
  if (newVal) {
    showGameOver = true
  }
})

onMounted(() => {
  if (!stats.value.instructionDismissed) {
    showHowTo = true
    stats.value.instructionDismissed = true
  }
})
</script>

<template>
  <div class="information-wrapper bg-hcsBlue flex items-center justify-center">
    <button role="button" class="btn mr-4" @click="showStats = true">
      Stats
    </button>
    <button role="button" class="btn" @click="showHowTo = true">
      How To Play
    </button>
  </div>

  <HowToModal v-model:show="showHowTo" />
  <StatsModal v-model:show="showStats" />
  <ResultsModal v-model:show="showGameOver" />
</template>

<style scoped>
.information-wrapper {
  width: 100vw;
  height: 4rem;
}

.btn {
  @apply border-none uppercase cursor-pointer text-white font-extrabold py-2 px-3;
  background: 0 0;
}
</style>
