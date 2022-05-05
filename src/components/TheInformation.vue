<script setup lang="ts">
import useGuess from '@/composables/useGuess'
import { onClickOutside, MaybeElement } from '@vueuse/core'
import { addDays, formatDuration, intervalToDuration, set } from 'date-fns'
let showStats = $ref(false)
let showHowTo = $ref(false)
let showGameOver = $ref(false)

const howToRef = ref<MaybeElement>(null)
onClickOutside(howToRef, () => {
  if (showHowTo) {
    showHowTo = false
  }
})

const statsRef = ref<MaybeElement>(null)
onClickOutside(statsRef, () => {
  if (showStats) {
    showStats = false
  }
})

const gameOverRef = ref<MaybeElement>(null)
onClickOutside(gameOverRef, () => {
  if (showStats) {
    showGameOver = false
  }
})

const toggleStats = () => {
  showStats = !showStats
}
const toggleHowTo = () => {
  showHowTo = !showHowTo
}
const toggleGameOver = () => {
  showGameOver = !showGameOver
}

const { stats, gameOver, answer, guesses, getShareableScore } = useGuess()
const wins = $computed(() => {
  const history = Object.values(stats.value.history)
  return history.filter(h => h === 'win').length
})
const gamesPlayed = $computed(() => {
  const history = Object.values(stats.value.history)
  const losses = history.filter(h => h === 'loss')
  return wins + losses.length
})

watch(gameOver, newVal => {
  if (newVal) {
    showGameOver = true
  }
})

let time = ref<string>()
onMounted(() => {
  if (!stats.value.instructionDismissed) {
    showHowTo = true
    stats.value.instructionDismissed = true
  }
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
  const url = new URL(`../assets/images/${image}`, import.meta.url).href
  return url
}
</script>

<template>
  <div class="information-wrapper bg-hcsBlue flex items-center justify-center">
    <button role="button" class="btn mr-4" @click="toggleStats"> Stats </button>
    <button role="button" class="btn" @click="toggleHowTo">
      How To Play
    </button>
  </div>

  <div v-show="showHowTo" class="modal-wrapper">
    <div class="modal" ref="howToRef">
      <div class="how-to-play">
        <div class="container">
          <div class="content">
            <h3 id="guess-the-mystery-player" class="text-hcsBlue">
              <button
                class="close-button bg-hcsBlue text-white"
                aria-hidden="true"
                tabindex="-1"
                @click="toggleHowTo"
              >
                <i-mdi-close></i-mdi-close>
              </button>
              Guess the mystery player!
            </h3>
            <ul>
              <li>
                You get eight guesses, try any HCS Player from the Kansas City
                Major
              </li>
              <li>
                <span class="bg-correct text-white">Green in any column</span>
                indicates a match!
              </li>
              <li>
                <span class="bg-close">
                  Yellow in the <strong>team</strong> column</span
                >
                indicates the mystery player is from the same region (NA, EU,
                AZ, MX)
              </li>
              <li>
                <span class="yellow">Yellow in any other column</span>
                indicates this attribute is within 10% of the mystery player
              </li>
              <li>A new mystery player every day!</li>
              <li>
                Data courtesy of
                <a
                  class="underline"
                  href="https://powerup.gg/halo/events/hcs-major-kansas-city-2022-133/stats"
                  >PowerUp.gg</a
                ></li
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="showStats" class="modal-wrapper">
    <div class="modal narrow" ref="statsRef">
      <div class="stats">
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
        class="close-button bg-hcsBlue text-white"
        aria-hidden="true"
        tabindex="-1"
        @click="toggleStats"
      >
        <i-mdi-close></i-mdi-close>
      </button>
    </div>
  </div>

  <div v-show="gameOver && showGameOver" class="modal-wrapper">
    <div class="modal narrow" ref="gameOverRef">
      <div class="game-over">
        <div
          class="success text-center flex flex-col items-center justify-center"
        >
          <div class="team-image">
            <img
              :src="getSrc(answer.teamImage)"
              :alt="`${answer.teamName} logo`"
            />
          </div>
          <div
            :class="{
              results: true,
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
          <div class="countdown-timer text-hcsBlue">
            <div>
              New mystery player in
              <div class="timer"> {{ time }} </div>
            </div>
          </div>
        </div>
      </div>

      <button
        class="close-button bg-hcsBlue text-white"
        aria-hidden="true"
        tabindex="-1"
        @click="toggleGameOver"
      >
        <i-mdi-close></i-mdi-close>
      </button>
    </div>
  </div>
</template>

<style scoped>
.information-wrapper {
  width: 100vw;
  height: 4rem;
}

.btn {
  background: 0 0;
  border: none;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 20px;
  color: #fff;
  font-size: 1em;
  font-weight: 700;
  padding: 0.5em 0.75em;
  text-transform: uppercase;
  cursor: pointer;
}

.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 600px;
  max-height: 100%;
  padding: 20px;
  background: #fff;
  z-index: 5;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgb(0 0 0 / 25%);
  width: calc(100vw - 40px);
}

.modal.narrow {
  max-width: 500px;
}

.how-to-play {
  overflow: auto;
  max-height: 90vh;
}

.how-to-play h3 {
  font-weight: 700;
  text-align: center;
  font-size: 20px;
}

.how-to-play ul {
  font-size: 15px;
  padding: 0 0 0 1.5em;
  margin: 0;
  list-style: disc;
}

.how-to-play ul li {
  margin: 16px 0;
  line-height: 24px;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  -moz-column-gap: 50px;
  column-gap: 50px;
  align-items: center;
  text-align: center;
  padding: 2em 0;
}

.stats h4 {
  text-transform: uppercase;
  margin: 0 0 10px;
  font-weight: 700;
}

.stats p {
  font-size: 36px;
  margin: 0;
}

.container {
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-image {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  width: 100%;
  img {
    height: 50px;
    width: auto;
  }
}

.results {
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 40px 10px 30px;
  color: #4e78ba;
}

.results h3 {
  font-size: 17px;
  font-weight: 400;
  margin: 0;
}
.results h2 {
  font-size: 21px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin: 10px 0;
  font-weight: 800;
}

.countdown-timer {
  margin-top: 15px;
  font-size: 14px;
}

.countdown-timer .timer {
  margin-top: 2px;
  font-size: 24px;
  font-family: 'Roboto Mono', monospace;
  font-weight: 800;
}

@media (min-width: 768px) {
  .btn {
    font-size: 14px;
  }

  .modal {
    padding: 40px;
  }

  .stats {
    column-gap: 72px;
  }

  .stats h4 {
    font-size: 1.25em;
  }

  .stats p {
    font-size: 54px;
  }

  .results h3 {
    font-size: 19px;
  }
  .results h2 {
    font-size: 28px;
  }
}
</style>
