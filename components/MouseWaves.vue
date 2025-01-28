<template>
  <div class="mouse-waves-layer">
    <div>
      <div class="wave delay-1"></div>
      <div class="wave delay-2"></div>
      <div class="wave delay-3"></div>
      <div class="wave delay-4"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onWatcherCleanup } from "vue";
import { SECTIONS_IDS } from "~/constants/sections-ids";

const { xCoordinate, yCoordinate } = useMouseLocation();
const mouseWaveElementHide = ref<"none" | "block">("none");
const waveDuration = ref(7);

const handleDocumentClick = (ev: MouseEvent) => {
  const heroSection = (ev.target as HTMLElement).closest(
    `#${SECTIONS_IDS.HERO}`,
  );

  if (heroSection) {
    mouseWaveElementHide.value = "block";
    return;
  }
};

onMounted(() => {
  window.document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  window.document.removeEventListener("click", handleDocumentClick);
});

watch(
  () => [mouseWaveElementHide.value],
  () => {
    const timeoutId = setTimeout(() => {
      mouseWaveElementHide.value = "none";
    }, waveDuration.value * 1000);

    onWatcherCleanup(() => {
      clearTimeout(timeoutId);
    });
  },
);
</script>
<style scoped lang="css">
.mouse-waves-layer {
  --width: 300px;
  --height: 300px;
  position: absolute;
  width: var(--width);
  height: var(--height);
  top: v-bind(`calc(${yCoordinate}px - (var(--height) / 4)) `);
  left: v-bind(`calc(${xCoordinate}px) `);
  display: v-bind(mouseWaveElementHide);
  transform: translate(-50%, -50%);
}

.mouse-waves-layer > div {
  position: relative;
  width: 100%;
  height: 100%;
}

.mouse-waves-layer > :first-child > .wave {
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

.delay-1 {
  animation-name: waves;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.3s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: (--wave-direction);
}
.delay-2 {
  animation-name: waves-1;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 0.7s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.delay-3 {
  animation-name: waves-2;
  animation-duration: var(--waves-duration);
  animation-timing-function: var(--wave-timing-function);
  animation-delay: 1.1s;
  animation-fill-mode: var(--waves-fill-mode);
  animation-direction: var(--wave-direction);
}
.delay-4 {
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
