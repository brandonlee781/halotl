<script setup lang="ts">
import useGuess from '@/composables/useGuess'
import statsJson from '@/stats.json'
import { Player } from '@/store/guesses'

const { guesses, gameOver, checkGuess } = useGuess()
let current = $ref<string>()

const placeholder = $computed(() => {
  if (gameOver.value) return 'Game Over'
  return `Guess ${guesses.value.length + 1} of 8`
})

const results = $computed<Player[]>(() => {
  if (!current?.length) return []
  return statsJson
    .filter(p => p.name.toLowerCase().includes(current?.toLowerCase()))
    .slice(0, 5)
})

const enterGuess = (player: Player) => {
  const correctGuess = checkGuess(player)
  if (correctGuess) gameOver.value = 'win'
  guesses.value = [...guesses.value, player]
  current = ''
}
</script>

<template>
  <div class="wrapper relative content mb-12">
    <div class="combobox border-b-2 border-b-hcsBlue">
      <input
        v-model="current"
        class="relative w-full font-extrabold p-4 border-hcsBlue text-hcsBlue focus:outline-none p-input"
        type="text"
        role="combobox"
        autocomplete="off"
        :disabled="!!gameOver"
        :placeholder="placeholder"
      />
    </div>
    <div class="absolute bg-white border-hcsBlue z-3 inset-x-0">
      <ul v-if="results.length" class="list-none p-0 m-0">
        <li
          v-for="(player, index) in results"
          class="px-4 py-6 font-medium cursor-pointer select-none hover:bg-[#4e78ba33] p-input"
          :key="index"
          @click="enterGuess(player)"
        >
          {{ player.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.p-input {
  @apply p-4 md:(text-lg p-8);
}
</style>
