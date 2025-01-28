export default function useTrackScroll() {
  const scrollY = ref(0);
  const scrollX = ref(0);

  const onScroll = () => {
    scrollY.value = window.scrollY;
    scrollX.value = window.scrollX;
  };

  onMounted(() => {
    window.addEventListener("scroll", onScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  return { scrollY, scrollX };
}
