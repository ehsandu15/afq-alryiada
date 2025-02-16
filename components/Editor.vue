<template>
  <div ref="editorRef"></div>
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
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-go";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "~/assets/prism-js/prism.css";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import type { VNodeRef } from "vue";

const props = defineProps<{
  data: string;
}>();
const timeoutRef = ref(-1);
const editorRef = ref<VNodeRef | null>(null);

const runtimeConf = useRuntimeConfig();

ClassicEditor.defaultConfig = {
  licenseKey: runtimeConf.public.ckeditor.ckeditorLicenseKey, // Or 'GPL'.
  plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter, CodeBlock],
  toolbar: [],
  codeBlock: {
    languages: [
      { language: "javascript", label: "JavaScript" },
      { language: "typescript", label: "TypeScript" },
      { language: "css", label: "CSS" },
    ],
  },
};

onMounted(() => {
  ClassicEditor.create(editorRef.value, {
    initialData: props.data,
    codeBlock: {
      languages: [
        { language: "javascript", label: "JavaScript" },
        { language: "python", label: "Python" },
      ],
    },
  })
    .then((editor) => {
      const codeBlocks = editor.editing.view.domConverter
        .viewToDom(editor.editing.view.document.getRoot())
        .querySelectorAll("pre code");

      codeBlocks.forEach((block) => {
        Prism.highlightElement(block, true);
      });
    })
    .catch((error) => {
      console.error("Failed to initialize CKEditor:", error);
    });
  // Prism.highlightAll();
});
</script>

<style lang="css">
.ck-content pre {
  background-color: #323747;
  padding: 1em;
  border-radius: 4px;
  overflow: auto;
}

.ck-content code {
  font-family: "Courier New", monospace;
  color: #cbcbcb;
}
.editor-wrapper {
  width: 100%;
  display: grid;
}

.editor-wrapper .ck-editor__top {
  display: none !important;
}
.editor-wrapper .ck-editor__main .ck-content {
  border: none !important;
  background-color: transparent;
}
.code-container {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  overflow-x: auto;
  margin-bottom: 0.5em;
}
</style>
