<template>
  <li class="testimonials-card">
    <span class="comment-author">
      <figure class="size-[43px] md:size-[60px]">
        <NuxtImg
          :src="testimonial.authorCover.url"
          :alt="testimonial.authorCover.alternativeText"
          width="44"
          height="44"
          class="w-full rounded-full"
        />
      </figure>
      <span class="flex flex-col">
        <p class="text-sm font-bold capitalize md:text-xl">
          {{ testimonial.authorName }}
        </p>
        <p class="text-xs font-semibold capitalize opacity-50 md:text-base">
          {{ testimonial.authorTitle }}
        </p>
      </span>
    </span>
    <p class="comment">{{ testimonial.comment }}</p>
  </li>
</template>

<script setup lang="ts">
import type { TestimonialsType } from "~/types/testimonials";

defineProps<{
  testimonial: TestimonialsType;
}>();
</script>
<style scoped>
.testimonials-card {
  @apply flex min-h-[190px] w-full min-w-[calc(100%-1rem)] !shrink-0 flex-col gap-6 rounded-app-radius bg-white p-6 transition-colors md:min-h-[136px] md:w-full;
  transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: 0 4px 10px 0 #5050500d;
}
.testimonials-card.active {
  @apply bg-secondary;
}
.testimonials-card .comment-author {
  @apply flex items-center gap-[10px];
}
.testimonials-card.active .comment-author > span * {
  @apply !text-white;
}
.testimonials-card .comment {
  @apply text-[13px] font-semibold md:text-lg;
}
.testimonials-card.active .comment {
  @apply text-white;
}
</style>
