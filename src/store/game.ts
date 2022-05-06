import { defineStore } from 'pinia'
import { answerIndex } from './guesses'
import { RemovableRef, useStorage } from '@vueuse/core'

export type Stats = {
  dayLastPlayed: number
  instructionDismissed: boolean
  history: { [key: number]: 'win' | 'loss' }
}

export const useGameStore = defineStore('game', () => {
  const stats = useStorage<Stats>('halotl-results', {
    dayLastPlayed: answerIndex,
    instructionDismissed: false,
    history: {},
  })
  const gameOver = ref<'win' | 'loss' | null>(null)

  return {
    stats,
    gameOver,
  }
})
