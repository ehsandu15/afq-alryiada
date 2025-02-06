<template>
  <div
    class="waves-component_list"
    id="waves-component_list"
    ref="wavesList"
  ></div>
</template>
<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import { onWatcherCleanup } from "vue";
import { SECTIONS_IDS } from "~/constants/sections-ids";

// USED IN CSS !!
const wavesList = ref<HTMLDivElement | null>(null);
const { x: xCoordinate, y: yCoordinate } = useMouse();
const waveDuration = ref(5);
const WAVES_ELEMENT = () => {
  const MOUSE_WAVES_LAYER_HEIGHT = 300;
  const MOUSE_WAVES_LAYER_WIDTH = 300;

  const mouseWavesLayer = document.createElement("div");
  mouseWavesLayer.style.top = `${yCoordinate.value - MOUSE_WAVES_LAYER_HEIGHT / 5}px`;
  mouseWavesLayer.style.left = `${xCoordinate.value}px`;
  mouseWavesLayer.style.height = `${MOUSE_WAVES_LAYER_HEIGHT}px`;
  mouseWavesLayer.style.width = `${MOUSE_WAVES_LAYER_WIDTH}px`;
  mouseWavesLayer.className = "waves-component__layer";

  const mouseWavesItemContainer = document.createElement("ul");
  mouseWavesLayer.appendChild(mouseWavesItemContainer);
  const mouseWavesItemDelayOne = document.createElement("li");
  mouseWavesItemDelayOne.className =
    "waves-component__layer__wave waves-component__layer__delay_1";
  const mouseWavesItemDelayTwo = document.createElement("li");
  mouseWavesItemDelayTwo.className =
    "waves-component__layer__wave waves-component__layer__delay_2";
  const mouseWavesItemDelayThree = document.createElement("li");
  mouseWavesItemDelayThree.className =
    "waves-component__layer__wave waves-component__layer__delay_3";
  const mouseWavesItemDelayFour = document.createElement("li");
  mouseWavesItemDelayFour.className =
    "waves-component__layer__wave waves-component__layer__delay_4";

  mouseWavesItemContainer.appendChild(mouseWavesItemDelayOne);
  mouseWavesItemContainer.appendChild(mouseWavesItemDelayTwo);
  mouseWavesItemContainer.appendChild(mouseWavesItemDelayThree);
  mouseWavesItemContainer.appendChild(mouseWavesItemDelayFour);

  return mouseWavesLayer;
};

const timeoutRefs = ref<Set<NodeJS.Timeout>>(new Set());

const handleDocumentClick = (ev: MouseEvent) => {
  const sectionId = (ev.target as HTMLElement).closest("section")?.id;
  if (sectionId !== SECTIONS_IDS.HERO) return;

  if (!wavesList.value) {
    console.error("Error Waves list is not available");
    return;
  }

  const wavesElement = WAVES_ELEMENT();
  wavesList.value.appendChild(wavesElement);

  const timeoutId = setTimeout(() => {
    wavesElement.remove();
    timeoutRefs.value.delete(timeoutId);
  }, waveDuration.value * 1000);

  timeoutRefs.value.add(timeoutId);
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick, { passive: true });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
  // Clear all timeouts
  timeoutRefs.value.forEach(clearTimeout);
  timeoutRefs.value.clear();
});
</script>

<style lang="css">
.waves-component_list {
  position: absolute;
  display: flex;
  inset: 0;
  pointer-events: none;
}
.waves-component__layer {
  position: absolute;
  /* top: v-bind(`calc(${yCoordinate}px - (var(--height) / 4)) `);
  left: v-bind(`calc(${xCoordinate}px) `); */
  display: block;
  transform: translate(-50%, -50%);
}

.waves-component__layer > div {
  position: relative;
  width: 100%;
  height: 100%;
}

.waves-component__layer > :first-child > .waves-component__layer__wave {
  --waves-duration: v-bind(waveDuration + "s");
  --waves-fill-mode: both;
  --wave-direction: alternate;
  --wave-timing-function: cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #c7c7cc;
  animation-name: waves;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  transition: 5s ease-in-out;
}

.waves-component__layer__delay_1 {
  animation-name: waves;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.3s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: (--wave-direction);
}
.waves-component__layer__delay_2 {
  animation-name: waves-1;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.7s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.waves-component__layer__delay_3 {
  animation-name: waves-2;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 1.1s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.waves-component__layer__delay_4 {
  animation-name: waves-3;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 1.6s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
@keyframes waves {
  0% {
    transform: scale(0.2);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.2;
  }
}
</style>
