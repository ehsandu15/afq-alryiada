import type { Directive } from "vue";

interface IntersectBindingValue {
  callback: (entry: IntersectionObserverEntry) => void;
  options?: IntersectionObserverInit;
}

const vIntersect: Directive<HTMLElement, IntersectBindingValue> = {
  mounted(el, binding) {
    const { callback, options } = binding.value || {};

    if (!callback || typeof callback !== "function") {
      console.warn("[v-intersect] No callback function provided!");
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);

    observer.observe(el);

    // ✅ Tell TypeScript this element can have __observer__
    (el as HTMLElement & { __observer__?: IntersectionObserver }).__observer__ =
      observer;
  },

  unmounted(el) {
    // ✅ Type assertion again to avoid TS error
    (
      el as HTMLElement & { __observer__?: IntersectionObserver }
    ).__observer__?.disconnect();
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("intersect", vIntersect);
});
