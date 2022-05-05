<script setup lang="ts"></script>

<template>
  <div class="game-table__head border-b-2 border-b-hcsBlue text-hcsBlue">
    <GameTableRow>
      <GameTableCell></GameTableCell>
      <GameTableCell>Team</GameTableCell>
      <GameTableCell>Kills</GameTableCell>
      <GameTableCell>Assists</GameTableCell>
      <GameTableCell>Damage</GameTableCell>
      <GameTableCell>Power Kills</GameTableCell>
      <GameTableCell>Flag Caps</GameTableCell>
      <GameTableCell>Ball Time</GameTableCell>
    </GameTableRow>
  </div>
</template>

<style>
.game-table__head {
  box-shadow: 0 5px 30px rgb(0 0 0 / 30%);
  overflow-x: hidden;
  position: relative;
  z-index: 1;
}

.game-table__head .game-table__row {
  display: grid;
  grid-template-columns: 0 60px 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 0.75em;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
}

@media (min-width: 768px) {
  .game-table__head {
    padding: initial;
    margin: initial;
  }

  .game-table__head .game-table__row {
    grid-template-columns: 250px 100px 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
