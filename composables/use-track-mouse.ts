export default function useTrackMouse() {
  const xCoordinate = ref(0);
  const yCoordinate = ref(0);

  const trackMouse = (event: MouseEvent) => {
    xCoordinate.value = event.pageX;
    yCoordinate.value = event.pageY;
  };

  onMounted(() => {
    window.addEventListener("mousemove", trackMouse);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", trackMouse);
  });

  return { xCoordinate, yCoordinate };
}
