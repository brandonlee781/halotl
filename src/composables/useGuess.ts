import { storeToRefs } from 'pinia'

import { useGuessesStore, Player, answerIndex } from '@/store/guesses'
import { useGameStore } from '@/store/game'

export default function () {
  const guessStore = useGuessesStore()
  const gameStore = useGameStore()
  const { guesses, answer } = storeToRefs(guessStore)
  const { stats, gameOver } = storeToRefs(gameStore)

  onMounted(() => {
    if (answerIndex !== stats.value.dayLastPlayed) {
      guesses.value = []
      gameOver.value = null
    } else if (stats.value.history[answerIndex]) {
      gameOver.value = stats.value.history[answerIndex]
    }
    stats.value.dayLastPlayed = answerIndex
  })

  const checkGuess = (guess: Player) => {
    let count = 0
    if (guess.teamName === answer.value.teamName) count++
    if (guess.kills === answer.value.kills) count++
    if (guess.assists === answer.value.assists) count++
    if (guess.damageDealt === answer.value.damageDealt) count++
    if (guess.killsPowerWeapons === answer.value.killsPowerWeapons) count++
    if (guess.flagCaptures === answer.value.flagCaptures) count++
    if (guess.oddballTotalTime === answer.value.oddballTotalTime) count++

    if (count < 7) return false
    return true
  }

  watch(guesses, guessVal => {
    if (guessVal.length === 8 && !gameOver.value) {
      gameOver.value = 'loss'
    }
  })

  watch(gameOver, (newVal, oldVal) => {
    if (!newVal || newVal === oldVal) return
    stats.value.history[answerIndex] = newVal
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
      if (guess.name === answer.value.name) guessStr += '🟩'
      else if (guess.region === answer.value.region) guessStr += '🟨'
      else guessStr += '⬛'

      guessStr += compare(guess, answer.value, 'kills')
      guessStr += compare(guess, answer.value, 'assists')
      guessStr += compare(guess, answer.value, 'damageDealt')
      guessStr += compare(guess, answer.value, 'killsPowerWeapons')
      guessStr += compare(guess, answer.value, 'flagCaptures')
      guessStr += compare(guess, answer.value, 'oddballTotalTime')
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
