<script setup lang="ts">
import { addDays, formatDuration, intervalToDuration, set } from 'date-fns'
import { onClickOutside, MaybeElement } from '@vueuse/core'
import useGuess from '@/composables/useGuess'

const props = defineProps({ show: { type: Boolean, default: false } })
const emits = defineEmits(['update:show'])

const modalRef = ref<MaybeElement>(null)
onClickOutside(modalRef, () => {
  if (props.show) {
    emits('update:show', false)
  }
})

const { gameOver, answer, guesses, getShareableScore } = useGuess()

let time = ref<string>()
onMounted(() => {
  setInterval(() => {
    nextTick(() => {
      let duration = intervalToDuration({
        start: new Date(),
        end: set(addDays(new Date(), 1), { hours: 0, minutes: 0, seconds: 0 }),
      })
      const hours = duration.hours?.toLocaleString('en-us', {
        minimumIntegerDigits: 2,
      })
      const minutes = duration.minutes?.toLocaleString('en-us', {
        minimumIntegerDigits: 2,
      })
      const seconds = duration.seconds?.toLocaleString('en-us', {
        minimumIntegerDigits: 2,
      })
      time.value = `${hours}:${minutes}:${seconds}`
    })
  }, 1000)
})

const getSrc = (image: string) => {
  const url = new URL(`../../assets/images/${image}`, import.meta.url).href
  return url
}
</script>

<template>
  <div v-show="gameOver && show" class="modal-wrapper">
    <div class="modal narrow" ref="gameOverRef">
      <div class="game-over">
        <div
          class="success text-center flex flex-col items-center justify-center"
        >
          <div class="flex-center py-4 w-full">
            <img
              class="time-image"
              :src="getSrc(answer.teamImage)"
              :alt="`${answer.teamName} logo`"
            />
          </div>
          <div
            :class="{
              'border-t-1 border-b-1 pt-40px pb-30px px-10px text-hcsBlue': true,
              '!border-b-red-900 !border-t-red-900': gameOver === 'lose',
            }"
          >
            <template v-if="gameOver === 'lose'">
              <h3>Sorry, the correct answer is</h3>
              <h2>{{ answer.name }}</h2>
              <h3>You can try again tomorrow!</h3>
            </template>
            <template v-else-if="gameOver === 'win'">
              <h3>Great Job!</h3>
              <h2>{{ answer.name }}</h2>
              <h3>You solved in {{ guesses.length }} guess</h3>
            </template>
            <div class="share-button">
              <button
                class="bg-hcsBlue px-8 py-4 mt-4 text-white"
                @click="getShareableScore"
              >
                Share My Score
              </button>
            </div>
          </div>
          <div class="mt-4 text-hcsBlue">
            <div>
              New mystery player in
              <div class="text-2rem font-extrabold"> {{ time }} </div>
            </div>
          </div>
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
h3 {
  @apply m-0 md:text-xl;
}

h2 {
  @apply text-xl md:text-3xl font-extrabold uppercase tracking-wide my-10px;
}
</style>
