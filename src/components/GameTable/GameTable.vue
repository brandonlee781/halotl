<template>
  <div class="container">
    <div class="game-table">
      <GameTableHead></GameTableHead>
      <GameTableBody></GameTableBody>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.container {
  max-width: 940px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0 20px;
}
.game-table {
  position: relative;
  z-index: 1;
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
