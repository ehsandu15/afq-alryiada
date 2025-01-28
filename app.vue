<template>
  <main class="flex min-h-screen flex-col items-center justify-center">
    <AppHeader />
    <NuxtPage />
    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import AppFooter from "./layout/app-footer.vue";
import AppHeader from "./layout/app-header.vue";
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
