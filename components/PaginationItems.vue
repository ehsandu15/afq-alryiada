<template>
  <div class="mx-auto flex w-fit items-center justify-center gap-[18px]">
    <button
      type="button"
      class="flex size-10 items-center justify-center rounded-full bg-[#F5F5F8] text-app-black-secondary disabled:bg-gray-300 disabled:text-gray-400"
      :disabled="currentPage === 1"
      title="prev-page"
      @click="
        () => {
          $emit('onPrevPage');
          goToPage(currentPage + 1);
        }
      "
    >
      <svg
        class="h-6 w-6 text-inherit dark:text-inherit"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m10 16 4-4-4-4"
        />
      </svg>
    </button>
    <button
      type="button"
      class="flex size-10 items-center justify-center rounded-full bg-[#F5F5F8] text-app-black-secondary"
      :class="
        clsx({
          'bg-secondary text-white': currentPage && currentPage === item,
        })
      "
      @click="
        () => {
          $emit('onTogglePage', item);
          goToPage(item);
        }
      "
      v-for="item of pages"
      :disabled="currentPage === item || item <= 0"
      :title="item <= 0 ? undefined : item?.toString()"
    >
      {{ item >= 0 ? item : "..." }}
    </button>
    <button
      type="button"
      class="flex size-10 items-center justify-center rounded-full bg-[#F5F5F8] text-app-black-secondary disabled:bg-gray-300 disabled:text-gray-400"
      @click="
        () => {
          $emit('onNextPage');
          goToPage(currentPage + 1);
        }
      "
      :disabled="currentPage === totalPages"
      title="next-page"
    >
      <svg
        class="h-6 w-6 text-inherit dark:text-inherit"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m14 8-4 4 4 4"
        />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
import { useOffsetPagination } from "@vueuse/core";
import clsx from "clsx";

const props = defineProps<{
  totalPages: number;
  page: number;
  buttonsLimit: number;
}>();
defineEmits<{
  (ev: "onNextPage"): void;
  (ev: "onPrevPage"): void;
  (ev: "onTogglePage", pageTarget: number): void;
}>();

const { currentPage, pages, goToPage } = usePagination({
  maxVisible: props.buttonsLimit,
  totalPages: props.totalPages,
  page: props.page,
});
</script>
