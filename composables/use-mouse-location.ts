export default function useMouseLocation() {
  const xCoordinate = ref(0);
  const yCoordinate = ref(0);

  const trackMouse = (event: MouseEvent) => {
    xCoordinate.value = event.pageX;
    yCoordinate.value = event.pageY;
  };

  onMounted(() => {
    window.addEventListener("click", trackMouse);
  });

  onUnmounted(() => {
    window.removeEventListener("click", trackMouse);
  });

  return { xCoordinate, yCoordinate };
}
