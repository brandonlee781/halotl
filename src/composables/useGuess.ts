import statsJson from '@/stats.json'
import { useStorage } from '@vueuse/core'
import { differenceInDays } from 'date-fns'

export type Player = typeof statsJson[0]

const getIndex = () => {
  const today = new Date()
  const start = new Date('05/05/2022')
  const daysSince = differenceInDays(today, start)

  const index = daysSince % statsJson.length
  return index
}
const answerIndex = getIndex()

const sortedStats = [...statsJson].sort((a, b) => {
  return a.key - b.key
})

const answer = sortedStats[getIndex()]
const guesses = useStorage<Player[]>('halotl-guesses', [])

type Stats = {
  dayLastPlayed: number
  instructionDismissed: boolean
  history: { [key: number]: 'win' | 'loss' }
}

const stats = useStorage<Stats>('halotl-results', {
  dayLastPlayed: answerIndex,
  instructionDismissed: false,
  history: {},
})
const gameOver = ref()

export default function () {
  onMounted(() => {
    if (answerIndex !== stats.value.dayLastPlayed) {
      guesses.value = []
    } else if (stats.value.history[answerIndex]) {
      gameOver.value = stats.value.history[answerIndex]
    }
    stats.value.dayLastPlayed = answerIndex
  })

  const checkGuess = (guess: Player) => {
    let count = 0
    if (guess.teamName === answer.teamName) count++
    if (guess.kills === answer.kills) count++
    if (guess.assists === answer.assists) count++
    if (guess.damageDealt === answer.damageDealt) count++
    if (guess.killsPowerWeapons === answer.killsPowerWeapons) count++
    if (guess.flagCaptures === answer.flagCaptures) count++
    if (guess.oddballTotalTime === answer.oddballTotalTime) count++

    if (count < 7) return false
    return true
  }

  watch(guesses, guessVal => {
    if (guessVal.length === 8 && !gameOver.value) {
      gameOver.value = 'lose'
    }
  })

  watch(gameOver, (newVal, oldVal) => {
    if (newVal === oldVal) return
    stats.value.history[answerIndex] = gameOver.value
  })

  return {
    gameOver,
    answer,
    guesses,
    checkGuess,
    stats,
  }
}
