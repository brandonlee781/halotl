<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import useGuess from '@/composables/useGuess'
const { answer, guesses } = useGuess()
</script>

<template>
  <TheInformation></TheInformation>
  <TheHeader></TheHeader>
  <PlayerInput />
  <GameTable v-if="guesses?.length"></GameTable>
  <ReloadPrompt />
</template>

<style>
#app {
  background-color: #f5f2ec;
  height: 100vh;
  width: 100vw;
  color: #313131;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
}
</style>
