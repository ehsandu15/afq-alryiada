import { computed, ref } from "vue";

export function usePagination({
  maxVisible = 5,
  totalPages,
  page,
}: {
  totalPages: number;
  maxVisible: number;
  page: number;
}) {
  const currentPage = ref(page);

  const pages = computed(() => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const visiblePages = [];
    const leftOffset = Math.floor(maxVisible / 2);
    const rightOffset = Math.ceil(maxVisible / 2) - 1;

    // If near the start
    if (currentPage.value <= leftOffset + 1) {
      visiblePages.push(
        ...Array.from({ length: maxVisible - 1 }, (_, i) => i + 1),
        -1,
        totalPages,
      );
    }
    // If near the end
    else if (currentPage.value >= totalPages - rightOffset) {
      visiblePages.push(
        1,
        -1,
        ...Array.from(
          { length: maxVisible - 1 },
          (_, i) => totalPages - maxVisible + 2 + i,
        ),
      );
    }
    // If in the middle
    else {
      visiblePages.push(
        1,
        -1,
        ...Array.from(
          { length: maxVisible - 2 },
          (_, i) => currentPage.value - leftOffset + i,
        ),
        -1,
        totalPages,
      );
    }

    return visiblePages;
  });

  const goToPage = (page: number | -1) => {
    if (page !== -1) currentPage.value = page;
  };

  return { currentPage, pages, goToPage };
}
