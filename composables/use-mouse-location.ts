export default function useMouseLocation(
  element: Ref<HTMLDivElement | null, HTMLDivElement | null>,
) {
  const xCoordinate = ref(0);
  const yCoordinate = ref(0);

  const trackMouse = (event: MouseEvent) => {
    xCoordinate.value = event.clientX;
    yCoordinate.value = event.clientY;
  };

  onMounted(() => {
    if (element.value) {
      element.value.addEventListener("click", trackMouse);
      return;
    }
    window.addEventListener("click", trackMouse);
  });

  onUnmounted(() => {
    if (element.value) {
      element.value.removeEventListener("click", trackMouse);
      return;
    }
    window.removeEventListener("click", trackMouse);
  });

  return { xCoordinate, yCoordinate };
}
