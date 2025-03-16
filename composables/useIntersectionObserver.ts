import { ref, onMounted, onUnmounted } from "vue";

export function useIntersectionObserver(
  targetRef: Ref<HTMLElement | null>,
  options: IntersectionObserverInit = {},
) {
  const isIntersecting = ref(false);

  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!targetRef.value) return;

    observer = new IntersectionObserver(([entry]) => {
      isIntersecting.value = entry.isIntersecting;
    }, options);

    observer.observe(targetRef.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { isIntersecting };
}
