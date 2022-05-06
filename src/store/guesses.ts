import { RemovableRef, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import statsJson from '@/stats.json'
import { differenceInDays } from 'date-fns'
export type Player = typeof statsJson[0]

const getIndex = () => {
  const today = new Date()
  const start = new Date('05/05/2022')
  const daysSince = differenceInDays(today, start)

  const index = daysSince % statsJson.length
  return index
}
export const answerIndex = getIndex()

const encode = (str: string) => {
  let number = '0x'
  for (let i = 0; i < str.length; i++) {
    number += str.charCodeAt(i).toString(16)
  }
  return parseInt(number)
}

const sortedStats = [...statsJson].sort((a, b) => {
  const aKey = encode(a.name + a.teamName + a.map)
  const bKey = encode(b.name + b.teamName + b.map)
  return aKey - bKey
})

const answer = sortedStats[getIndex()]

type GuessesState = {
  guesses: RemovableRef<Player[]>
  answer: Player
}

export const useGuessesStore = defineStore('guesses', {
  state: (): GuessesState => ({
    guesses: useStorage('halotl-guesses', []),
    answer,
  }),
})
