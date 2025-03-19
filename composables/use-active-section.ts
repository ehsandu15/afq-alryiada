import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "nuxt/app";

export function useActiveSection() {
  const activeSection = ref<string | null>(null);
  const route = useRoute();
  let observer: IntersectionObserver | null = null;

  const updateActiveSection = (entries: IntersectionObserverEntry[]) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleSections.length > 0) {
      const firstVisible = visibleSections[0].target.id;
      if (!firstVisible) return;
      activeSection.value = firstVisible;

      const newUrl = `/#${firstVisible}`;

      window.history.replaceState(null, "", newUrl);
    }
  };

  const setupObserver = () => {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(updateActiveSection, {
      root: null,
      threshold: 0.5,
    });

    document.querySelectorAll("section[data-section]").forEach((section) => {
      observer?.observe(section);
    });
  };

  onMounted(setupObserver);
  onUnmounted(() => observer?.disconnect());

  watch(
    () => route.hash,
    (newHash) => {
      if (newHash) {
        setupObserver();
      } else {
        observer?.disconnect();
      }
    },
  );
  watch(
    () => route.path,
    (newPath) => {
      if (newPath) {
        activeSection.value = null;
      }
    },
  );

  return {
    activeSection,
    isActive: (link: string) => {
      const isHash = link.startsWith("/#");
      const hash = link.split("#")[1] || "";

      if (link === "/") {
        return activeSection.value === "" || activeSection.value === "#";
      }

      if (isHash) {
        return activeSection.value === hash;
      }

      return route.path.includes(link);
    },
  };
}
