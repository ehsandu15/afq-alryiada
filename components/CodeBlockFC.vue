<script setup lang="tsx">
import { VCodeBlock } from "@wdns/vue-code-block";
import { h, ref, onMounted } from "vue";
import { HIGHLIGHT_JS_THEMES } from "~/constants/highlight-js-themes";

type ExtractAttrsType = {
  tag: string;
  attributes: Record<string, string>;
  children: ExtractAttrsType[];
};

const props = defineProps<{ data: string | undefined }>();
const parsedNodes = ref<ChildNode[]>([]);

const parseHtml = () => {
  if (import.meta.client && props.data) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(props.data, "text/html");
    parsedNodes.value = Array.from(doc.body.childNodes);
  }
};

const extractElementAttrs = (element: HTMLElement | Element) => {
  const standardAttributes = new Set([
    "id",
    "class",
    "title",
    "style",
    "src",
    "href",
    "alt",
    "name",
    "type",
    "value",
    "disabled",
    "readonly",
    "checked",
    "placeholder",
    "required",
    "maxlength",
    "minlength",
    "pattern",
    "autocomplete",
    "autofocus",
    "multiple",
    "step",
    "tabindex",
    "data-*",
    "role",
    "aria-*",
    "hidden",
    "draggable",
    "contenteditable",
    "spellcheck",
  ]);

  function extractAttributes(el: HTMLElement | Element): ExtractAttrsType {
    const attributes: Record<string, string> = {};
    for (let attr of el.attributes) {
      if (
        standardAttributes.has(attr.name) ||
        attr.name.startsWith("data-") ||
        attr.name.startsWith("aria-")
      ) {
        attributes[attr.name] = attr.value;
      }
    }
    return {
      tag: el.tagName.toLowerCase(),
      attributes,
      children: [...el.children].map(extractAttributes), // Recursively get child elements
    };
  }

  return extractAttributes(element);
};

const renderNode = (node: ChildNode): any => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as HTMLElement;
    const { attributes: props, tag: tagName } = extractElementAttrs(element);

    if (
      tagName === "pre" &&
      element.firstElementChild?.tagName.toLowerCase() === "code"
    ) {
      const codeTag = element.firstElementChild;
      const { attributes: props } = extractElementAttrs(codeTag);

      let lang = props?.class.match(/language-([\w-]+)/)?.[1] || "plaintext";

      return h(VCodeBlock, {
        code: codeTag ? element.firstElementChild.textContent || "" : "",
        highlightjs: true,
        lang,
        dir: "ltr",
        theme: HIGHLIGHT_JS_THEMES.VS2015,
        browserWindow: true,
        maxHeight: "70vh",
        runTab: true,
      });
    }

    return h(tagName, props, Array.from(element.childNodes).map(renderNode));
  }

  return null;
};

onMounted(parseHtml);
</script>

<template>
  <div class="prose w-full max-w-full">
    <template v-for="(node, index) in parsedNodes" :key="index">
      <component :is="renderNode(node)" />
    </template>
  </div>
</template>
