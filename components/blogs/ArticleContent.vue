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
const props = defineProps<{
  content: string | undefined;
}>();
// const heading = (
//   level: 1 | 2 | 3 | 4 | 5 | 6,
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   switch (level) {
//     case 1:
//       return h("h1", { class: "text-4xl font-bold" }, children);
//     case 2:
//       return h("h2", { class: "text-3xl font-semibold" }, children);
//     case 3:
//       return h("h3", { class: "text-2xl font-semibold" }, children);
//     case 4:
//       return h("h4", { class: "text-xl font-medium" }, children);
//     case 5:
//       return h("h5", { class: "text-lg font-medium" }, children);
//     case 6:
//       return h("h6", { class: "text-base font-medium" }, children);

//     default:
//       return h("h6", { class: "text-base font-medium" }, children);
//   }
// };
// const paragraph = (
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h(
//     "p",
//     { class: "block !my-[1em] mx-0 !text-[16px] font-[400]" },
//     children,
//   );
// };

// const quote = (
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h(
//     "blockquote",
//     {
//       class:
//         "relative border-l-4 border-indigo-500 pl-6 italic bg-[#a19a9a6b] text-app-black-secondary px-3 py-3 text-gray-700 before:content-['“'] before:text-indigo-500 before:text-4xl before:absolute before:-left-1 before:-top-3",
//     },
//     children,
//   );
// };

// const link = (
//   url: string,
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h(
//     "a",
//     {
//       href: url,
//       class:
//         "text-indigo-600 font-medium transition duration-300 hover:text-indigo-800 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500",
//     },
//     children,
//   );
// };

// const list = (
//   format: "ordered" | "unordered",
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   if (format === "unordered") {
//     return h(
//       "ul",
//       { class: "list-disc pl-5 space-y-2 text-gray-700" },
//       children,
//     );
//   } else {
//     return h(
//       "ol",
//       { class: "list-decimal pl-5 space-y-2 text-gray-700" },
//       children,
//     );
//   }
// };
// const listItem = (
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h("li", { class: "hover:text-blue-600 transition" }, children);
// };

// const image = (
//   imageProps: ImageType,
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h(
//     "img",
//     {
//       width: imageProps.width,
//       height: imageProps.height,
//       alt: imageProps.alternativeText,
//       src: imageProps.url,
//       class: "object-cover max-w-full md:max-w-[50%]",
//     },
//     children,
//   );
// };

// const code = (
//   language: string,
//   children:
//     | VNode<
//         RendererNode,
//         RendererElement,
//         {
//           [key: string]: any;
//         }
//       >
//     | undefined,
// ) => {
//   return h(
//     "div",
//     {
//       dir: "ltr",
//       class: clsx(`code-container`),
//     },

//     h(
//       "pre",
//       null,
//       h("code", { class: clsx(`language-${language}`) }, children),
//     ),
//   );
// };

// const blocks: Partial<BlocksComponents> = {
//   paragraph: (props) => paragraph(props.children),
//   heading: (props) => heading(props.level, props.children),
//   quote: (props) => quote(props.children),
//   link: (props) => link(props.url, props.children),
//   list: (props) => list(props.format, props.children),
//   "list-item": (props) => listItem(props.children),
//   image: (props) => image(props.image as any, props.children),
//   code: (props) => {
//     return h(
//       "pre",
//       h("code", { class: `language-${props.language}` }, props.plainText),
//     );
//   },
// };
// const modifiers: Partial<ModifiersComponents> = {
//   code: (props) => {
//     console.log(props);
//     return code((props as any).language, props.children);
//   },
// };
</script>
<style>
.editor-wrapper {
  width: 100%;
}
</style>
