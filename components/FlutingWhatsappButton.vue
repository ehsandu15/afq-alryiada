<template>
  <a
    :href="phoneNumber"
    class="flex size-11 items-center justify-center md:size-14"
  >
    <img
      :src="iconUrl"
      alt="whatsapp-btn"
      width="56"
      height="56"
      class="w-full"
    />
  </a>
</template>
<script setup lang="ts">
defineProps<{
  phoneNumber: string;
  iconUrl: string;
}>();
</script>
