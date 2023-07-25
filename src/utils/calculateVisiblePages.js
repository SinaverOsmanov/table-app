export function calculateVisiblePages(page, numberOfPages, maxViliblePages) {
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );
  const startPage = Math.max(1, page - Math.floor(maxViliblePages / 2));
  const endPage = Math.min(numberOfPages, startPage + maxViliblePages - 1);
  const visiblePages = pagesArray.slice(startPage - 1, endPage);

  return visiblePages;
}
