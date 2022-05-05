<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'
const intervalMS = 15 * 60 * 1000

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        console.log('checking for update')
        r.update()
      }, intervalMS)
  },
})
const close = async () => {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <div
    v-if="offlineReady || needRefresh"
    class="pwa-toast bg-[#f5f2ec] border-2 border-hcsBlue rounded-lg font-bold"
    role="alert"
  >
    <div class="message">
      <span v-if="offlineReady">App ready to work offline</span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>
    <button
      class="text-hcsBlue border-2 border-hcsBlue rounded-md"
      v-if="needRefresh"
      @click="updateServiceWorker()"
    >
      Reload
    </button>
    <button
      class="text-hcsBlue border-2 border-hcsBlue rounded-md"
      @click="close"
    >
      Close
    </button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  z-index: 1;
  text-align: left;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  outline: none;
  margin-right: 5px;
  padding: 3px 10px;
}
</style>
