<template>
  <div ref="editorRef" id="editor" class="prose max-w-full" v-html="data"></div>
</template>

<script setup lang="ts">
import {
  ClassicEditor,
  CodeBlock,
  Essentials,
  Paragraph,
  Bold,
  Italic,
} from "ckeditor5";
import { FormatPainter } from "ckeditor5-premium-features";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.min.css";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import type { VNodeRef } from "vue";

const props = defineProps<{
  data: string;
}>();
const editorRef = ref<VNodeRef | null>(null);
const runtimeConf = useRuntimeConfig();

ClassicEditor.defaultConfig = {
  licenseKey: runtimeConf.public.ckeditor.ckeditorLicenseKey, // Or 'GPL'.
  plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter, CodeBlock],
  toolbar: [],
  codeBlock: {
    languages: [],
  },
};

onMounted(() => {
  if (props.data && editorRef.value) {
    const codeElements = editorRef.value.querySelectorAll("pre code");

    (codeElements as HTMLElement[]).forEach((block) => {
      const match = block.className.match(/language-(\w+)/);
      const language = match ? match[1] : "plaintext";
      console.log({ language });
      block.innerHTML = hljs.highlight(block.textContent as string, {
        language,
      }).value;
      block.classList.add("hljs");
      block.dir = "ltr";
    });
  }
});

// useHead({
//   link: [
//     {
//       rel: "stylesheet",
//       href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap-reboot.min.css",
//     },
//   ],
// });
</script>

<style lang="css">
pre {
  padding: 0 !important;
}
</style>
