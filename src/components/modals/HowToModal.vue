<script setup lang="ts">
import { onClickOutside, MaybeElement } from '@vueuse/core'
const props = defineProps({ show: { type: Boolean, default: false } })
const emits = defineEmits(['update:show'])

const modalRef = ref<MaybeElement>(null)
onClickOutside(modalRef, () => {
  if (props.show) {
    emits('update:show', false)
  }
})
</script>

<template>
  <div v-show="show" class="modal-wrapper flex-center">
    <div class="modal felx-center" ref="modalRef">
      <div class="overflow-auto max-h-[90vh]">
        <div class="content py-6 w-full">
          <div class="">
            <h3 class="text-hcsBlue text-center text-lg font-bold">
              <button
                class="btn-close flex-center"
                aria-hidden="true"
                tabindex="-1"
                @click="$emit('update:show', false)"
              >
                <i-mdi-close></i-mdi-close>
              </button>
              Guess the mystery player!
            </h3>
            <ul class="pl-[1.5rem] m-0 list-disc">
              <li>
                You get eight guesses, try any HCS Player from the Kansas City
                Major
              </li>
              <li>
                <span class="bg-correct text-white">Green in any column</span>
                indicates a match!
              </li>
              <li>
                <span class="bg-close">
                  Yellow in the <strong>team</strong> column</span
                >
                indicates the mystery player is from the same region (NA, EU,
                AZ, MX)
              </li>
              <li>
                <span class="yellow">Yellow in any other column</span>
                indicates this attribute is within 10% of the mystery player
              </li>
              <li>A new mystery player every day!</li>
              <li>
                Data courtesy of
                <a
                  class="underline"
                  href="https://powerup.gg/halo/events/hcs-major-kansas-city-2022-133/stats"
                  >PowerUp.gg</a
                ></li
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
li {
  @apply my-4 leading-[24px];
}
</style>
