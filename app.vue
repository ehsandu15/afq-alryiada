<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :color="theme.colors.secondary" />

    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { theme } from "#tailwind-config";
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.5s linear,
    transform 0,
    7s ease-in;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
