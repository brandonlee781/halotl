<script setup lang="ts">
import useGuess from '@/composables/useGuess'
defineProps({
  name: { type: String, required: true },
  team: { type: String, required: true },
  teamImage: { type: String, required: true },
  kills: { type: Number, required: true },
  damage: { type: Number, required: true },
  assists: { type: Number, required: true },
  killsPowerWeapons: { type: Number, required: true },
  flagCaptures: { type: Number, required: true },
  oddballTotalTime: { type: Number, default: 0 },
  lastRow: { type: Boolean, default: false },
})

const { gameOver } = useGuess()
</script>

<template>
  <GameTableRow>
    <GameTableCell :status="lastRow && gameOver ? gameOver : null">
      <div>
        <div class="text">{{ name }}</div>
      </div>
    </GameTableCell>
    <GameTableTeamCell :team="team" :image="teamImage" :last-row="lastRow" />
    <GameTableBodyCell value-key="kills" :value="kills" :last-row="lastRow" />
    <GameTableBodyCell
      value-key="assists"
      :value="assists"
      :last-row="lastRow"
    />
    <GameTableBodyCell
      value-key="damageDealt"
      :value="damage"
      :last-row="lastRow"
    />
    <GameTableBodyCell
      value-key="killsPowerWeapons"
      :value="killsPowerWeapons"
      :last-row="lastRow"
    />
    <GameTableBodyCell
      value-key="flagCaptures"
      :value="flagCaptures"
      :last-row="lastRow"
    />
    <GameTableBodyCell
      value-key="oddballTotalTime"
      :value="oddballTotalTime"
      :last-row="lastRow"
    />
  </GameTableRow>
</template>

<style scoped>
.game-table__row {
  padding: 0 20px;
  background: linear-gradient(0deg, #edeae5 0, #fff);
  border-bottom: 1px solid #727272;
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'name name name name name name name'
    'team kills assist dam power caps ball';
}

.game-table__row:last-child {
  border-bottom: none;
}

.game-table__row .game-table__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  background: #edeae5;
  border: 1px solid #f5f2ec;
  border-bottom: none;
  border-left: none;
  position: relative;
}

.game-table__row .game-table__cell:first-child {
  background: 0 0;
  grid-area: name;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: 700;
  border: none;
}

.game-table__row .game-table__cell:first-child > div {
  padding: 16px 0;
}

.game-table__row .game-table__cell > div {
  padding: 14px 8px;
}

@screen md {
  .game-table__row {
    background: 0 0;
    padding: initial;
    grid-template-columns: 250px 100px 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas: 'name team kills assist dam power caps ball';
  }

  .game-table__row .game-table__cell {
    border-top: none;
    font-size: 16px;
  }

  .game-table__row .game-table__cell:first-child {
    border-right: 1px solid #f5f2ec;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
