<template>
  <div ref="editorRef" id="editor" class="prose max-w-full" v-html="data"></div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.min.css";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { warn, type VNodeRef } from "vue";

const props = defineProps<{
  data: string;
}>();
const editorRef = ref<VNodeRef | null>(null);
let copyTimeout: NodeJS.Timeout | null = null;

function codeContextCopyButton(block: HTMLElement) {
  // const preElement = block.closest("pre");
  // if (preElement) {
  const clipboardIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M9 13H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path></svg>`;
  const checkedIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>`;
  const copyButton = document.createElement("button");

  copyButton.classList.add("copy-btn");
  copyButton.innerHTML = clipboardIcon;
  // preElement.style.position = "relative";
  // preElement.appendChild(copyButton);

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(block.textContent || "");
    if (copyTimeout) clearTimeout(copyTimeout);
    copyButton.innerHTML = checkedIcon;
    copyTimeout = setTimeout(() => {
      copyButton.innerHTML = clipboardIcon;
    }, 2000);
  });
  return copyButton;

  // }
  // console.warn('WARN: Copy button not available')
  // return null
}

function highlightCodeSyntax(
  codeElements: HTMLElement[],
  addonsCb?: (ctx: {
    block: HTMLElement;
    container: HTMLDivElement;
    language: string;
  }) => void,
) {
  codeElements.forEach((block) => {
    const match = block.className.match(/language-(\w+)/);
    const language = match ? match[1] : "plaintext";
    const container = document.createElement("div");
    container.classList.add("code-actions-wrapper");

    block.innerHTML = hljs.highlight(block.textContent as string, {
      language,
    }).value;
    block.classList.add("hljs");
    block.dir = "ltr";

    const preElement = block.closest("pre");
    if (!preElement) {
      warn(
        'WARN: Copy button not available. The "pre" element does not exist.',
      );
      return;
    }
    preElement.style.position = "relative";
    block.style.paddingBlockStart = "3rem";
    preElement.appendChild(container);

    const ctx = {
      language,
      block,
      container,
    };

    addonsCb?.(ctx);
  });
}

function languageNameElement(codeElements: HTMLElement[], language: string) {
  const languageLabel = document.createElement("span");
  languageLabel.textContent = language.toUpperCase();
  languageLabel.classList.add("language-label");

  return languageLabel;
}

onMounted(() => {
  if (props.data && editorRef.value) {
    const codeElements = editorRef.value.querySelectorAll("pre code");
    highlightCodeSyntax(codeElements, ({ block, container, language }) => {
      const languageName = languageNameElement(codeElements, language);
      const copyButton = codeContextCopyButton(block);

      container?.appendChild(copyButton);
      container?.appendChild(languageName);
    });
  }
});
</script>

<style lang="css">
pre {
  padding: 0 !important;
}
.code-actions-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.copy-btn {
  padding: 6px 10px;
  background: #555;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #666;
}
.language-label {
  color: #fff;
  font-size: 12px;
  background-color: #333;
  padding: 6px 10px;
  border-radius: 4px;
}
</style>
