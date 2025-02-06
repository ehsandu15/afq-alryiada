<template>
  <li class="testimonials-card" style="box-shadow: 0 4px 10px 0 #5050500d">
    <span class="comment-author">
      <figure class="size-[43px] md:size-[60px]">
        <img
          :src="comment.authorCover.url"
          :alt="comment.authorCover.alternativeText"
          class="w-full rounded-full"
        />
      </figure>
      <span class="flex flex-col">
        <p class="text-sm font-bold capitalize md:text-xl">
          {{ comment.authorName }}
        </p>
        <p class="text-xs font-semibold capitalize md:text-base">
          {{ comment.authorTitle }}
        </p>
      </span>
    </span>
    <p class="comment">{{ comment.comment }}</p>
  </li>
</template>

<script setup lang="ts">
import type { TestimonialsType } from "~/types/testimonials";

defineProps<{
  comment: TestimonialsType;
}>();
</script>
<style scoped>
.testimonials-card {
  @apply flex min-h-[190px] min-w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] !shrink-0 flex-col gap-6 rounded-app-radius bg-white p-6 md:min-h-[136px] md:min-w-[336px] md:max-w-[336px];
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
