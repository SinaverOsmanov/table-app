import { calculateVisiblePages } from "../utils/calculateVisiblePages";
import { FlexCol, FlexRow } from "../utils/flexLayouts";
import { updateURL } from "../utils/updateURL";
import Button from "./ui/Button";

const maxViliblePages = 5;

export function Pagination({ page, numberOfPages, onChange }) {
  const visiblePages = calculateVisiblePages(
    page,
    numberOfPages,
    maxViliblePages
  );

  function handlePageChange(newPageNumber) {
    if (
      newPageNumber !== page &&
      newPageNumber >= 1 &&
      newPageNumber <= numberOfPages
    ) {
      onChange(newPageNumber);
      updateURL(newPageNumber);
    }
  }

  function changeActivePage(pageNumber) {
    handlePageChange(pageNumber);
  }

  function nextPage() {
    handlePageChange(page + 1);
  }

  function prevPage() {
    handlePageChange(page - 1);
  }

  return (
    <nav
      aria-label="Page navigation"
      className="pagination flex flex-row mt-4 justify-between md:px-10 sm:px-5 items-baseline xs:px-0" // md:px-10-отступы слева и справа для экрана(768px)
    >
      <FlexCol className="w-1/3">
        <FlexRow className="justify-start xs:text-lg md:text-2xl">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </FlexRow>
      </FlexCol>
      <FlexCol className="page-numbers w-1/3">
        <FlexRow className="justify-center space-x-3">
          {visiblePages.map((pageNumber) => (
            <Button
              onClick={() => changeActivePage(pageNumber)}
              className={`flex flex-col ${pageNumber === page ? "active" : ""}`}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </FlexRow>
      </FlexCol>
      <FlexCol className="w-1/3">
        <FlexRow className="justify-end md:text-2xl xs:text-lg">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </FlexRow>
      </FlexCol>
    </nav>
  );
}
