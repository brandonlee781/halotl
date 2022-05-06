<script setup lang="ts">
import useGuess from '@/composables/useGuess'
import { onClickOutside, MaybeElement } from '@vueuse/core'
const props = defineProps({ show: { type: Boolean, default: false } })
const emits = defineEmits(['update:show'])

const modalRef = ref<MaybeElement>(null)
onClickOutside(modalRef, () => {
  if (props.show) {
    emits('update:show', false)
  }
})

const { stats } = useGuess()
const wins = $computed(() => {
  const history = Object.values(stats.value.history)
  return history.filter(h => h === 'win').length
})
const gamesPlayed = $computed(() => {
  const history = Object.values(stats.value.history)
  const losses = history.filter(h => h === 'loss')
  return wins + losses.length
})
</script>

<template>
  <div v-show="show" class="modal-wrapper flex-center">
    <div class="modal max-w-[500px]" ref="statsRef">
      <div
        class="grid grid-cols-2 gap-x-50px md:gap-x-72px items-center text-center py-8"
      >
        <div>
          <h4>Games<br />Played</h4>
          <p>{{ gamesPlayed }}</p>
        </div>
        <div>
          <h4>Win<br />Pct.</h4>
          <p>{{ gamesPlayed >= 1 ? (wins / gamesPlayed) * 100 : 0 }}%</p>
        </div>
      </div>

      <button
        class="btn-close flex-center"
        aria-hidden="true"
        tabindex="-1"
        @click="$emit('update:show', false)"
      >
        <i-mdi-close></i-mdi-close>
      </button>
    </div>
  </div>
</template>

<style scoped>
h4 {
  @apply uppercase mb-10px font-bold md:text-xl;
}
p {
  @apply text-36px m-0 md:text-54px;
}
</style>
