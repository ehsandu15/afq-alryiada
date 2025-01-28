export default function useAppDir() {
  const appDir = ref<"ltr" | "rtl">("rtl");

  const updateDir = () => {
    appDir.value = document.documentElement.dir as "ltr" | "rtl";
  };
  onMounted(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "dir") {
          updateDir();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
  });

  return { appDir, updateDir };
}
