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
      <h3
        class="isolate max-w-[350px] text-center text-5xl font-extrabold leading-[69.6px] text-white md:max-w-fit md:leading-[52.8px]"
        v-html="headingTitle"
        v-motion="{
          initial: { opacity: 0, y: 20 },
          visibleOnce: { opacity: 1, y: 0 },
        }"
        :duration="GLOBAL_MOTION_DURATION"
      ></h3>

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
      <img
        :src="content?.privilegePersonImage?.url"
        :alt="content?.privilegePersonImage?.alternativeText"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
// import menPrivileges from "~/assets/images/privileges/man-and-privileges-img.svg";
// import backgroundPatterns from "~/assets/images/privileges/bg-patterns.svg";
import { MOTION_DURATION as GLOBAL_MOTION_DURATION } from "~/constants/motion-config";
import type { PrivilegeSectionType } from "~/types/home-page";
import clsx from "clsx";
import { useEventListener } from "@vueuse/core";

const props = defineProps<{ content: PrivilegeSectionType }>();
const DELAY = 350;
const imgWidth = ref(190);
const columns = ref<number[]>([]);
const MOTION_DURATION = GLOBAL_MOTION_DURATION + 250;
const SCROLL_FADING_TOP = {
  initial: { opacity: 0, y: -220 },
  visibleOnce: { opacity: 1, y: 0 },
};
const SCROLL_FADING_BOTTOM = {
  initial: { opacity: 0, y: 265 },
  visibleOnce: { opacity: 1, y: 0 },
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: any = {
  drawId: null,
  animationId: null,
};

const canvasImageLoadHandler = ({
  canvas,
  ctx,
  image,
}: {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
}) => {
  // Get viewport size
  const { innerWidth: width, innerHeight: height } = window;
  canvas.width = width;
  canvas.height = height;

  const columns = Math.ceil(width / image.width);
  const rows = Math.ceil(height / image.height);

  // Store initial offsets for each column
  const columnOffsets = new Array(columns)
    .fill(0)
    // .map((_, i) => (i % 2 === 0 ? 265 : -220));
    .map((_, i) => (i % 2 === 0 ? 0 : 0));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let x = 0; x < columns; x++) {
      const offsetY = columnOffsets[x];

      for (let y = 0; y < rows; y++) {
        ctx.globalAlpha = 0.03;
        ctx.drawImage(image, x * image.width, y * image.height + offsetY);
      }
    }

    return requestAnimationFrame(draw);
  }

  function animate() {
    for (let x = 0; x < columns; x++) {
      const targetOffset = 0; // All columns animate to 0
      const speed = 0.07; // Adjust speed for smooth animation

      columnOffsets[x] += (targetOffset - columnOffsets[x]) * speed;
    }

    return requestAnimationFrame(animate);
  }

  const drawAnimationId = draw();
  // const animationId = animate();
  return {
    drawAnimationId,
    animationId: null,
  };
};

const handlePaintCanvasColumnOfImgs = (
  privilegePatternImage: string | undefined,
) => {
  const canvas = canvasRef.value;
  if (!canvas) {
    console.warn("WARN!!, Canvas element is not available");
    return;
  }
  if (!privilegePatternImage) {
    console.warn("WARN !!, the privilege image in not provided");
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.warn("WARN!!, Canvas context is not available");
    return;
  }
  const img = new Image();
  img.src = privilegePatternImage;

  img.addEventListener("load", () => {
    const { animationId, drawAnimationId } = canvasImageLoadHandler({
      canvas,
      ctx,
      image: img,
    });
    animationFrameId.drawId = drawAnimationId;
    animationFrameId.animationId = animationId;
  });
};

const handleCancelAnimations = (animationFrameId: {
  drawId: number;
  animationId: number;
}) => {
  if (animationFrameId.drawId) cancelAnimationFrame(animationFrameId.drawId);
  if (animationFrameId.animationId)
    cancelAnimationFrame(animationFrameId.animationId);
};

onMounted(() => {
  handlePaintCanvasColumnOfImgs(props.content?.privilegePatternImage?.url);
});

useEventListener("resize", (_ev) => {
  handleCancelAnimations(animationFrameId);
  const windowWidth = window.innerWidth;
  if (windowWidth >= 768) {
    imgWidth.value = 190;
  } else {
    imgWidth.value = 150;
  }
  handlePaintCanvasColumnOfImgs(props.content?.privilegePatternImage?.url);
});

onBeforeUnmount(() => {
  handleCancelAnimations(animationFrameId);
});

// const generateColumns = () => {
//   const screenWidth = window.innerWidth;
//   const columnsCount = Math.ceil(screenWidth / imgWidth.value);
//   return Array.from({ length: columnsCount }, (_, index) => index);
// };

// useEventListener("resize", (_ev) => {
//   const windowWidth = window.innerWidth;
//   if (windowWidth >= 768) {
//     imgWidth.value = 190;
//   } else {
//     imgWidth.value = 150;
//   }
//   columns.value = generateColumns();
// });

// onMounted(() => {
//   columns.value = generateColumns();
// });

const headingTitle = computed(() =>
  !props.content.privilegeHeadingTitle
    ? ""
    : highlightSpecificWord({
        text: props.content.privilegeHeadingTitle.title,
        word: props.content.privilegeHeadingTitle.highlightWords.map(
          (w) => w.word,
        ),
        classNames: "opacity-60",
      }),
);
</script>
<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
