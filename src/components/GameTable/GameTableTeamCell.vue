<script setup lang="ts">
import statsJson from '@/stats.json'
import useGuess from '@/composables/useGuess'
const props = defineProps({
  team: { type: String, required: true },
  image: { type: String, required: true },
  lastRow: { type: Boolean, default: false },
})

const { answer, gameOver } = useGuess()
const region = $computed(() => {
  return statsJson.find(s => s.teamName === props.team)?.region
})
const comparison = $computed(() => {
  if (props.team === answer.teamName) {
    return 'correct'
  } else if (region === answer.region) {
    return 'close'
  }
  return null
})

const getSrc = (image: string) => {
  const url = new URL(`../../assets/images/${image}`, import.meta.url).href
  return url
}
</script>

<template>
  <GameTableCell :status="(lastRow && gameOver) || comparison">
    <div>
      <img class="team-image" :src="getSrc(image)" :alt="`${team} logo`" />
      <div class="text"> {{ team }} </div>
    </div>
  </GameTableCell>
</template>

<style scoped>
.team-image {
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
