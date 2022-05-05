<template>
  <div class="game-table">
    <GameTableHead></GameTableHead>
    <GameTableBody></GameTableBody>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.game-table {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .game-table {
    overflow: hidden;
  }
}

.game-table-body {
  min-height: 140px;
}
</style>
