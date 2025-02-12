<template>
  <ckeditor :model-value="data" :editor="ClassicEditor" :config="config" />
</template>

<script setup lang="ts">
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import "ckeditor5/ckeditor5.css";
import "~/assets/css/prism.css";
const { $prism } = useNuxtApp();
onMounted(() => {
  $prism.highlightAll(true);
});

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  CodeUI,
  CodeBlock,
  CodeBlockUI,
  CodeEditing,
  CodeBlockEditing,
  Code,
  Italic,
} from "ckeditor5";
const config = computed(() => {
  return {
    licenseKey: "GPL", // Or 'GPL'.
    plugins: [
      Code,
      CodeBlock,
      CodeBlockUI,
      CodeEditing,
      CodeBlockEditing,
      Essentials,
      Paragraph,
      Bold,
      Italic,
      CodeUI,
    ],
    toolbar: [],
  };
});

defineProps<{
  data: string;
}>();
</script>
