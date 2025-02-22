<template>
  <div class="editor-wrapper">
    <ClientOnly placeholder-tag="div">
      <template #fallback>
        <div class="flex w-full flex-col gap-5 md:w-10/12">
          <span class="my-6 flex items-center justify-start gap-3">
            <span
              class="h-6 w-3/5 animate-pulse rounded-lg bg-slate-500"
            ></span>
          </span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/2 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/2 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
          <span
            class="h-96 w-full animate-pulse rounded-sm bg-slate-400 md:w-3/5"
          ></span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
          <span class="flex items-center justify-start gap-3">
            <span
              class="h-4 w-1/4 animate-pulse rounded-lg bg-slate-400"
            ></span>
            <span
              class="h-4 w-1/3 animate-pulse rounded-lg bg-slate-400"
            ></span>
          </span>
        </div>
      </template>

      <Editor v-if="content" :data="content" :disabled="true" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  content: string | undefined;
}>();
</script>
<style>
.editor-wrapper {
  width: 100%;
}
</style>
