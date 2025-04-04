<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="theme.colors.secondary || '#ED4136'" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { theme } from "#tailwind-config";
</script>

<style>
.page-enter-active,
.page-leave-active {
  /* MacOS */
  --duration: 500ms;
  --curve: cubic-bezier(0.4, 0, 0.2, 1);

  /* Android 15 */
  /* --motion-duration: 500ms; */
  /* --motion-easing: cubic-bezier(0.2, 0, 0, 1); */

  /* Windows 11 */
  /* --transition-duration: 600ms;
  --transition-curve: cubic-bezier(0.1, 0.9, 0.2, 1); */

  /* Windows 11 */
  /* transition:
    opacity var(--transition-duration) var(--transition-curve),
    transform var(--transition-duration) var(--transition-curve); */

  /* Android */
  /* transition:
    opacity var(--motion-duration) var(--motion-easing),
    transform var(--motion-duration) var(--motion-easing); */

  /* MacOS */
  transition:
    opacity var(--duration) var(--curve),
    transform var(--duration) var(--curve);
}
.page-enter-from,
.page-leave-to {
  z-index: 0;
  border-radius: 12px;
  pointer-events: none;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(16px);

  opacity: 0;
  transform: translateX(30px);

  /* Android */
  /* opacity: 0;
  transform: translateX(100px) scale(0.98);
  pointer-events: none; */

  /* Apple */
  opacity: 0;
  transform: translateY(40px);
  pointer-events: none;
}
</style>
