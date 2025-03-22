<template>
  <section
    data-section="true"
    :id="content?.privilegesId?.elementId"
    class="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#244453] bg-cover bg-center bg-no-repeat md:justify-center"
  >
    <canvas ref="canvasRef"></canvas>
    <!-- :style="{ 'background-image': `url(${background})` }" -->
    <!-- <ul
      class="absolute inset-0 flex h-full w-full -translate-y-4 items-start justify-center gap-[25px] opacity-[0.03]"
    >
      <li
        v-if="columns.length > 0"
        v-for="col of columns"
        :key="col"
        v-motion="(col + 1) % 2 ? SCROLL_FADING_TOP : SCROLL_FADING_BOTTOM"
        :delay="(col + 1) % 2 ? 150 : 250"
        :duration="GLOBAL_MOTION_DURATION"
        class="h-full select-none bg-contain bg-center bg-repeat-y"
        :style="{
          backgroundImage: `url(${content?.privilegePatternImage?.url})`,
          width: `${imgWidth}px`,
        }"
      ></li>
    </ul> -->
    <AdvancedSectionHeading
      :title="content.privilegeSectionTitle.title"
      :icon-color-class="clsx(`bg-[#ED4136]`)"
      class="isolate mt-8 md:mt-[60px]"
    />
    <div class="mb-20 flex w-fit flex-col items-center justify-center gap-4">
      <HeadingHighlightedTitle
        :title="content.privilegeHeadingTitle.title"
        :words="content.privilegeHeadingTitle.highlightWords.map((w) => w.word)"
        marked-text-color-class-name="text-white !opacity-60"
        main-text-color-class-name="text-white"
        class="isolate mt-3 max-w-[350px] text-center text-5xl font-extrabold leading-[69.6px] md:max-w-fit md:leading-[52.8px]"
        v-motion="{
          initial: { opacity: 0, y: 20 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="GLOBAL_MOTION_DURATION"
      />
      <p
        class="app-container container text-center text-xl font-medium text-white text-opacity-60"
        v-motion="{
          initial: { opacity: 0, y: -20 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="GLOBAL_MOTION_DURATION"
      >
        {{ content.privilegeDescription }}
      </p>
    </div>
    <div
      class="isolate mb-4 flex items-center justify-center"
      v-motion="{
        initial: { opacity: 0, y: -100 },
        visibleOnce: { opacity: 1, y: 0 },
      }"
      :duration="MOTION_DURATION"
    >
      <NuxtImg
        :src="content?.privilegePersonImage?.url"
        :alt="content?.privilegePersonImage?.alternativeText"
        width="639"
        height="639"
        class="object-cover"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { MOTION_DURATION as GLOBAL_MOTION_DURATION } from "~/constants/motion-config";
import type { PrivilegeSectionType } from "~/types/home-page";
import clsx from "clsx";
import { useEventListener } from "@vueuse/core";
const props = defineProps<{ content: PrivilegeSectionType }>();
const imgWidth = ref(190);
const MOTION_DURATION = GLOBAL_MOTION_DURATION + 250;
const canvasRef = ref<HTMLCanvasElement | null>(null);

const canvasImageLoadHandler = ({
  canvas,
  ctx,
  image,
}: {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
}) => {
  const parent = canvas.parentElement;
  if (!parent) {
    console.warn("Canvas parent element is not available");
    return;
  }

  // ✅ Set canvas size to match parent section
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;

  const columns = Math.ceil(canvas.width / image.width);
  const rows = Math.ceil(canvas.height / image.height);

  const columnOffsets = new Array(columns).fill(0); // No animation, static offset

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < columns; x++) {
      const offsetY = columnOffsets[x];

      for (let y = 0; y < rows; y++) {
        ctx.globalAlpha = 0.1; // Image opacity
        ctx.drawImage(image, x * image.width, y * image.height + offsetY);
      }
    }
  }

  draw(); // ✅ Draw once without animation
};

const handlePaintCanvasColumnOfImgs = (privilegePatternImage?: string) => {
  const canvas = canvasRef.value;
  if (!canvas) return console.warn("Canvas element is not available");
  if (!privilegePatternImage) return console.warn("Image not provided");

  const ctx = canvas.getContext("2d");
  if (!ctx) return console.warn("Canvas context is not available");

  const img = new Image();
  img.src = privilegePatternImage;

  img.addEventListener("load", () => {
    canvasImageLoadHandler({ canvas, ctx, image: img });
  });
};

useEventListener("resize", () => {
  handlePaintCanvasColumnOfImgs(props.content?.privilegePatternImage?.url);
});

onMounted(() => {
  handlePaintCanvasColumnOfImgs(props.content?.privilegePatternImage?.url);
});

useEventListener("resize", (_ev) => {
  // handleCancelAnimations(animationFrameId);
  const windowWidth = window.innerWidth;
  if (windowWidth >= 768) {
    imgWidth.value = 190;
  } else {
    imgWidth.value = 150;
  }
  handlePaintCanvasColumnOfImgs(props.content?.privilegePatternImage?.url);
});
</script>
<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  display: block; /* Avoid extra space below canvas */
}
</style>
