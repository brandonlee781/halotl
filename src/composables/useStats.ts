import statsJson from '../stats.json'

export default function useStats() {
  const players = statsJson.map(s => {
    return s.name
  })

  return {
    players,
  }
}
