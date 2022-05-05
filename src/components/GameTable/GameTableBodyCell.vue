<script setup lang="ts">
import useGuess from '@/composables/useGuess'

interface Props {
  value: number
  image?: string
  valueKey:
    | 'kills'
    | 'assists'
    | 'damageDealt'
    | 'killsPowerWeapons'
    | 'flagCaptures'
    | 'oddballTotalTime'
  lastRow: boolean
}
const props = defineProps<Props>()

const { answer, gameOver } = useGuess()

type Comparison = {
  status?: 'correct' | 'close'
  dir?: 'higher' | 'lower'
  diff: number
}
const comparison = $computed<Comparison>(() => {
  const answerVal = answer[props.valueKey]!
  const diff = answerVal - props.value
  const close = Math.abs(diff) <= answerVal * 0.1
  if (answerVal === props.value) return { status: 'correct', diff }
  if (diff > 0 && close) return { status: 'close', dir: 'higher', diff }
  if (diff < 0 && close) return { status: 'close', dir: 'lower', diff }
  return { status: undefined, diff }
})
</script>

<template>
  <GameTableCell :status="(lastRow && gameOver) || comparison.status">
    <div>
      <div class="text"> {{ value }} </div>
      <div v-if="comparison.status === 'close'" class="dir">
        <i-mdi-arrow-down v-if="comparison.dir === 'lower'" />
        <i-mdi-arrow-up v-if="comparison.dir === 'higher'" />
      </div>
    </div>
  </GameTableCell>
</template>

<style scoped>
.dir {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 1px;
}
</style>
