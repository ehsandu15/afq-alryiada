<template>
  <a
    :href="phoneNumber"
    class="fixed bottom-16 left-6 isolate z-30 flex size-10 items-center justify-center rounded-full shadow-2xl md:bottom-14 md:left-12 md:size-[54px] lg:size-[64px]"
  >
    <img :src="iconUrl" alt="whatsapp-btn" />
  </a>
</template>
<script setup lang="ts">
defineProps<{
  phoneNumber: string;
  iconUrl: string;
}>();
</script>
