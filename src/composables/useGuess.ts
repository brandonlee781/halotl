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
      gameOver.value = false
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

  const compare = (guess: Player, ans: Player, key: keyof Player) => {
    const answerVal = ans[key]! as number
    const diff = answerVal - (guess[key] as number)
    const close = Math.abs(diff) <= answerVal * 0.1
    if (answerVal === guess[key]) return '🟩'
    if (close) return '🟨'
    return '⬛'
  }

  const getShareableScore = async () => {
    let str = `Halotl ${answerIndex} - ${guesses.value.length}/8\n\n`
    guesses.value.forEach(guess => {
      let guessStr = ''
      if (guess.name === answer.name) guessStr += '🟩'
      else if (guess.region === answer.region) guessStr += '🟨'
      else guessStr += '⬛'

      guessStr += compare(guess, answer, 'kills')
      guessStr += compare(guess, answer, 'assists')
      guessStr += compare(guess, answer, 'damageDealt')
      guessStr += compare(guess, answer, 'killsPowerWeapons')
      guessStr += compare(guess, answer, 'flagCaptures')
      guessStr += compare(guess, answer, 'oddballTotalTime')
      guessStr += '\n'
      str += guessStr
    })
    navigator.clipboard.writeText(str).then(() => {
      alert('Copied to clipboard')
    })
  }

  return {
    gameOver,
    answer,
    guesses,
    checkGuess,
    stats,
    getShareableScore,
  }
}
