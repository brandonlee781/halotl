<script setup lang="ts">
import useGuess, { Player } from '@/composables/useGuess'
import statsJson from '@/stats.json'

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
  <div class="wrapper">
    <div class="combobox">
      <input
        v-model="current"
        type="text"
        role="combobox"
        autocomplete="off"
        :placeholder="placeholder"
      />
    </div>
    <div class="results">
      <ul v-if="results.length">
        <li
          v-for="(player, index) in results"
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
.wrapper {
  position: relative;
  max-width: 540px;
  margin: 0 auto;
  margin-bottom: 3rem;
}

.wrapper input {
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  padding: 20px;
  border: 1px solid #4e78ba;
  color: #4e78ba;
  position: relative;
  z-index: 3;
}

.wrapper input:focus {
  outline: 0;
}

@media (min-width: 768px) {
  .wrapper input {
    font-size: 18px;
    padding: 30px;
  }
}

.results {
  position: absolute;
  top: 89px;
  left: 0;
  right: 0;
  z-index: 3;
  background: white;
  border: 1px solid #4e78ba;
}

.results ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.results ul li {
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.results ul li:hover {
  background-color: #4e78ba33;
}

@media (min-width: 768px) {
  .results ul li {
    padding: 18px 30px;
    font-size: 18px;
  }
}
</style>
